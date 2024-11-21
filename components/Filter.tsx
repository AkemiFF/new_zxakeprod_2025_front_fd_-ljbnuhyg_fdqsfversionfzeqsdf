'use client'

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import LocationContext from '@/layouts/context/locationContext'
import { cn } from "@/lib/utils"
import UrlConfig from '@/util/config'
import { format } from "date-fns"
import { CalendarIcon, MapPinIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useContext, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

interface Type {
  type_name: string
}
export default function Filter(props) {
  const { t } = useTranslation()
  const router = useRouter()
  const [visible, setVisible] = useState(false)

  const [locationSelected, setLocationSelected] = useState(null)
  const [locations, setLocations] = useState([])

  const { location, setLocation } = useContext(LocationContext)

  const [typeSelected, setTypeSelected] = useState<Type>();
  const [types, setTypes] = useState<Type[]>([])

  const [date, setDate] = useState({ from: undefined, to: undefined })
  const [guest, setGuest] = useState('')

  const getAllLocation = () => {
    fetch(`${UrlConfig}/api/hebergement/cities/`)
      .then(res => res.json())
      // .then(data => setLocations(data))
      .catch(error => console.log(error))
  }

  const getAllType = () => {
    fetch(`${UrlConfig}/api/hebergement/type-hebergement/`)
      .then(res => res.json())
      .then(data => setTypes(data))
      .catch(error => console.log(error))
  }

  useEffect(() => {
    if (props.typeSelected) {
      types.forEach((type) => {
        if (type.type_name === props.typeSelected) {
          setTypeSelected(type)
        }
      })
    }
  }, [props.typeSelected, types])

  useEffect(() => {
    if (props.locationSelected) {
      locations.forEach((loc) => {
        if (loc === props.locationSelected) {
          setLocationSelected(loc)
          setLocation(loc)
        }
      })
    }
  }, [props.locationSelected, locations, setLocation])

  useEffect(() => {
    if (props.check_in && props.check_out) {
      setDate({ from: new Date(props.check_in), to: new Date(props.check_out) })
    }
  }, [props.check_in, props.check_out])

  useEffect(() => {
    if (props.guest) {
      setGuest(props.guest)
    }
  }, [props.guest])

  useEffect(() => {
    getAllLocation()
    getAllType()
  }, [])

  const search = () => {
    let urlFilter = new URLSearchParams()
    if (typeSelected) {
      urlFilter.append("type", typeSelected.type_name)
    }
    if (locationSelected) {
      urlFilter.append("location", locationSelected)
    }
    if (date.from && date.to) {
      urlFilter.append("check_in", date.from.toLocaleDateString())
      urlFilter.append("check_out", date.to.toLocaleDateString())
    }
    if (guest) {
      urlFilter.append("guest", guest)
    }
    if (urlFilter.toString().trim() !== "") {
      router.push("/users/accommodation/filter?" + urlFilter.toString())
    } else {
      router.push("/users/accommodation/filter")
    }
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      <Button onClick={() => setVisible(true)} className="md:hidden w-full mb-4" variant="outline">
        <MapPinIcon className="mr-2 h-4 w-4" /> Filter
      </Button>
      <div className="hidden md:flex space-x-4">
        <Select value={typeSelected?.type_name} onValueChange={(value) => setTypeSelected(types.find(t => t.type_name === value))}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder={`Type ${t("accommodation")}`} />
          </SelectTrigger>
          <SelectContent>
            {types.map((type) => (
              <SelectItem key={type.id} value={type.type_name}>{type.type_name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={locationSelected} onValueChange={setLocationSelected}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder={t("localisation")} />
          </SelectTrigger>
          <SelectContent>
            {locations.map((loc) => (
              <SelectItem key={loc} value={loc}>{loc}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className={cn("w-[300px] justify-start text-left font-normal", !date && "text-muted-foreground")}>
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date?.from ? (
                date.to ? (
                  <>
                    {format(date.from, "LLL dd, y")} - {format(date.to, "LLL dd, y")}
                  </>
                ) : (
                  format(date.from, "LLL dd, y")
                )
              ) : (
                <span>{t("check_in")} - {t("check_out")}</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              initialFocus
              mode="range"
              defaultMonth={date?.from}
              selected={date}
              onSelect={setDate}
              numberOfMonths={2}
            />
          </PopoverContent>
        </Popover>
        <Input
          type="number"
          placeholder={t("guest")}
          value={guest}
          onChange={(e) => setGuest(e.target.value)}
          className="w-[100px]"
        />
        <Button onClick={search}>Search</Button>
      </div>
      <Dialog open={visible} onOpenChange={setVisible}>
        <DialogContent>
          <div className="space-y-4">
            <Select value={typeSelected?.type_name} onValueChange={(value) => setTypeSelected(types.find(t => t.type_name === value))}>
              <SelectTrigger>
                <SelectValue placeholder={`Type ${t("accommodation")}`} />
              </SelectTrigger>
              <SelectContent>
                {types.map((type) => (
                  <SelectItem key={type.id} value={type.type_name}>{type.type_name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={locationSelected} onValueChange={setLocationSelected}>
              <SelectTrigger>
                <SelectValue placeholder={t("localisation")} />
              </SelectTrigger>
              <SelectContent>
                {locations.map((loc) => (
                  <SelectItem key={loc} value={loc}>{loc}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full justify-start text-left font-normal">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date?.from ? (
                    date.to ? (
                      <>
                        {format(date.from, "LLL dd, y")} - {format(date.to, "LLL dd, y")}
                      </>
                    ) : (
                      format(date.from, "LLL dd, y")
                    )
                  ) : (
                    <span>{t("check_in")} - {t("check_out")}</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  initialFocus
                  mode="range"
                  defaultMonth={date?.from}
                  selected={date}
                  onSelect={setDate}
                  numberOfMonths={2}
                />
              </PopoverContent>
            </Popover>
            <Input
              type="number"
              placeholder={t("guest")}
              value={guest}
              onChange={(e) => setGuest(e.target.value)}
            />
            <Button onClick={search} className="w-full">Search</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

