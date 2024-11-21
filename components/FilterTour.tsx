'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CalendarIcon, MapPinIcon } from 'lucide-react'
import { format } from "date-fns"
import { cn } from "@/lib/utils"

export default function FilterTour() {
  const router = useRouter()
  const [operatorTourSelected, setOperatorTourSelected] = useState('')
  const [locationSelected, setLocationSelected] = useState('')
  const [date, setDate] = useState<{ from: Date | undefined; to: Date | undefined }>({
    from: undefined,
    to: undefined,
  })

  const [location, setLocation] = useState([])

  const operators = [
    { name: "Cotisse" },
    { name: "Z-trip" }
  ]

  const getAllLocation = () => {
    fetch("/api/region/getAll")
      .then(res => res.json())
      .then(data => setLocation(data))
      .catch(error => console.log(error))
  }

  const search = () => {
    router.push("/users/tour/filter")
  }

  useEffect(() => {
    getAllLocation()
  }, [])

  return (
    <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
      <Select value={operatorTourSelected} onValueChange={setOperatorTourSelected}>
        <SelectTrigger className="w-full md:w-[200px]">
          <SelectValue placeholder="Operator tour" />
        </SelectTrigger>
        <SelectContent>
          {operators.map((operator) => (
            <SelectItem key={operator.name} value={operator.name}>
              {operator.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={locationSelected} onValueChange={setLocationSelected}>
        <SelectTrigger className="w-full md:w-[200px]">
          <SelectValue placeholder="Destination" />
        </SelectTrigger>
        <SelectContent>
          {location.map((loc: any) => (
            <SelectItem key={loc.id} value={loc.nom}>
              {loc.nom}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "w-full md:w-[300px] justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
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
              <span>Pick a date</span>
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

      <Button onClick={search} className="w-full md:w-auto">
        <MapPinIcon className="mr-2 h-4 w-4" />
        Search
      </Button>
    </div>
  )
}

