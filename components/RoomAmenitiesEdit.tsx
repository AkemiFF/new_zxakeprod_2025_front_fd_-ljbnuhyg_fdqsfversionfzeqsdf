'use client'

import { useState, useEffect } from 'react'
import { Checkbox } from "@/components/ui/checkbox"
import { UrlConfig } from '@/util/config'

interface Amenity {
  id: number
  nom_accessoire: string
}

interface RoomAmenitiesEditProps {
  setAmenitiesEdit: (amenities: Amenity[]) => void
  initialAmenities: Amenity[]
}

export default function RoomAmenitiesEdit({ setAmenitiesEdit, initialAmenities }: RoomAmenitiesEditProps) {
  const [accessoires, setAccessoires] = useState<Amenity[]>([])
  const [selectedAmenities, setSelectedAmenities] = useState<Amenity[]>([])

  useEffect(() => {
    fetch(`${UrlConfig.apiBaseUrl}/api/hebergement/accessoires-chambre/`)
      .then(response => response.json())
      .then(data => {
        setAccessoires(data)
        const initialSelected = data.filter(accessoire => 
          initialAmenities.some(amenity => amenity.id === accessoire.id)
        )
        setSelectedAmenities(initialSelected)
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des accessoires :', error)
      })
  }, [initialAmenities])

  const handleCheckboxChange = (accessoire: Amenity, isChecked: boolean) => {
    if (isChecked) {
      setSelectedAmenities(prev => [...prev, accessoire])
      setAmenitiesEdit(prev => [...prev, accessoire])
    } else {
      setSelectedAmenities(prev => prev.filter(item => item.id !== accessoire.id))
      setAmenitiesEdit(prev => prev.filter(item => item.id !== accessoire.id))
    }
  }

  return (
    <div className="space-y-4">
      {accessoires.map(accessoire => (
        <div key={accessoire.id} className="flex items-center space-x-2">
          <Checkbox
            id={`accessoire-${accessoire.id}`}
            checked={selectedAmenities.some(item => item.id === accessoire.id)}
            onCheckedChange={(checked) => handleCheckboxChange(accessoire, checked as boolean)}
          />
          <label
            htmlFor={`accessoire-${accessoire.id}`}
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            {accessoire.nom_accessoire}
          </label>
        </div>
      ))}
    </div>
  )
}

