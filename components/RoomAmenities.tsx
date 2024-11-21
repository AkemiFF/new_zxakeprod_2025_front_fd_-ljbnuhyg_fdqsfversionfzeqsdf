'use client'

import { useState, useEffect } from 'react'
import { Checkbox } from "@/components/ui/checkbox"
import { UrlConfig } from '@/util/config'

interface Amenity {
  id: number
  nom_accessoire: string
}

interface RoomAmenitiesProps {
  setAmenities: (amenities: Amenity[]) => void
  selectedAmenities?: Amenity[]
}

export default function RoomAmenities({ setAmenities, selectedAmenities = [] }: RoomAmenitiesProps) {
  const [accessoires, setAccessoires] = useState<Amenity[]>([])



  useEffect(() => {
    fetch(`${UrlConfig.apiBaseUrl}/api/hebergement/accessoires-chambre/`)
      .then(response => response.json())
      .then(data => {
        setAccessoires(data)
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des accessoires :', error)
      })
  }, [])

  /*const handleCheckboxChange = (amenity: Amenity, isChecked: boolean) => {
    if (isChecked) {
      setAmenities(prev  => [...prev, amenity])
    } else {
      setAmenities(prev => prev.filter(item => item.id !== amenity.id))
    }
  }
*/

const handleCheckboxChange = (amenity: Amenity, isChecked: boolean) => {
  setAmenities((prev: Amenity[]) => {
    if (isChecked) {
      return [...prev, amenity];
    } else {
      return prev.filter(item => item.id !== amenity.id);
    }
  });
};
  return (
    <div className="space-y-4">
      {accessoires.map(accessoire => {
        const isChecked = selectedAmenities.some(item => item.id === accessoire.id)

        return (
          <div key={accessoire.id} className="flex items-center space-x-2">
            <Checkbox
              id={`accessoire-${accessoire.id}`}
              checked={isChecked}
              onCheckedChange={(checked) => handleCheckboxChange(accessoire, checked as boolean)}
            />
            <label
              htmlFor={`accessoire-${accessoire.id}`}
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {accessoire.nom_accessoire}
            </label>
          </div>
        )
      })}
    </div>
  )
}

