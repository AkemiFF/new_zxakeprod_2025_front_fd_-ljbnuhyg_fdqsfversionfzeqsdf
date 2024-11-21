'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { MapPinIcon, ShoppingBagIcon, TagIcon } from 'lucide-react'
import UrlConfig from '@/util/config'

export default function FilterHandcraft(props) {
  const router = useRouter()
  const [visible, setVisible] = useState(false)

  const [store, setStore] = useState([])
  const [storeSelected, setStoreSelected] = useState()

  const [type, setType] = useState([])
  const [typeSelected, setTypeSelected] = useState([])

  const [locationSelected, setLocationSelected] = useState()
  const [location, setLocation] = useState([])

  const getAllLocation = () => {
    fetch("/api/region/getAll")
      .then(res => res.json())
      .then(data => setLocation(data))
      .catch(error => console.log(error))
  }

  const getAllTypes = () => {
    fetch(`${UrlConfig}/api/artisanat/specifications/`)
      .then(res => res.json())
      .then(data => setType(data.map(item => ({
        id: item.id,
        nom: item.type_specification
      }))))
      .catch(error => console.log(error))
  }

  useEffect(() => {
    getAllLocation()
    getAllTypes()
  }, [])

  const search = () => {
    let url = new URLSearchParams()
    if (storeSelected) {
      url.append("store", storeSelected.nom)
    }
    if (typeSelected.length > 0) {
      url.append("type", typeSelected.map(t => t.nom).join(','))
    }
    if (locationSelected) {
      url.append("location", locationSelected.nom)
    }
    if (url.toString().trim() !== "") {
      router.push("/users/handcraft/filter?" + url.toString())
    } else {
      router.push("/users/handcraft/filter")
    }
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      <Button onClick={() => setVisible(true)} className="md:hidden w-full mb-4" variant="outline">
        <MapPinIcon className="mr-2 h-4 w-4" /> Filter Handcraft
      </Button>
      <div className="hidden md:flex space-x-4">
        <Select value={storeSelected?.nom} onValueChange={(value) => setStoreSelected(store.find(s => s.nom === value))}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Handcraft store" />
          </SelectTrigger>
          <SelectContent>
            {store.map((s) => (
              <SelectItem key={s.id} value={s.nom}>{s.nom}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={locationSelected?.nom} onValueChange={(value) => setLocationSelected(location.find(l => l.nom === value))}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Location" />
          </SelectTrigger>
          <SelectContent>
            {location.map((loc) => (
              <SelectItem key={loc.id} value={loc.nom}>{loc.nom}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select
          value={typeSelected.map(t => t.nom)}
          onValueChange={(value) => setTypeSelected(type.filter(t => value.includes(t.nom)))}
          multiple
        >
          <SelectTrigger className="w-[300px]">
            <SelectValue placeholder="Handcraft type" />
          </SelectTrigger>
          <SelectContent>
            {type.map((t) => (
              <SelectItem key={t.id} value={t.nom}>{t.nom}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button onClick={search}>Search</Button>
      </div>
      <Dialog open={visible} onOpenChange={setVisible}>
        <DialogContent>
          <div className="space-y-4">
            <Select value={storeSelected?.nom} onValueChange={(value) => setStoreSelected(store.find(s => s.nom === value))}>
              <SelectTrigger>
                <SelectValue placeholder="Handcraft store" />
              </SelectTrigger>
              <SelectContent>
                {store.map((s) => (
                  <SelectItem key={s.id} value={s.nom}>{s.nom}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={locationSelected?.nom} onValueChange={(value) => setLocationSelected(location.find(l => l.nom === value))}>
              <SelectTrigger>
                <SelectValue placeholder="Location" />
              </SelectTrigger>
              <SelectContent>
                {location.map((loc) => (
                  <SelectItem key={loc.id} value={loc.nom}>{loc.nom}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select
              value={typeSelected.map(t => t.nom)}
              onValueChange={(value) => setTypeSelected(type.filter(t => value.includes(t.nom)))}
              multiple
            >
              <SelectTrigger>
                <SelectValue placeholder="Handcraft type" />
              </SelectTrigger>
              <SelectContent>
                {type.map((t) => (
                  <SelectItem key={t.id} value={t.nom}>{t.nom}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button onClick={search} className="w-full">Search</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

