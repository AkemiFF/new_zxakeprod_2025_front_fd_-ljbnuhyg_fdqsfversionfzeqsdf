'use client'

import { Checkbox } from "@/components/ui/checkbox"
import { useEffect, useState } from 'react'

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
  const [localAmenities, setLocalAmenities] = useState<Amenity[]>(selectedAmenities) // État local pour gérer les accessoires sélectionnés

  useEffect(() => {
    fetch(`${UrlConfig}/api/hebergement/accessoires-chambre/`)
      .then(response => response.json())
      .then(data => {
        setAccessoires(data)
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des accessoires :', error)
      })
  }, [])

  const handleCheckboxChange = (amenity: Amenity, isChecked: boolean) => {
    const updatedAmenities = isChecked
      ? [...localAmenities, amenity]
      : localAmenities.filter(item => item.id !== amenity.id)

    setLocalAmenities(updatedAmenities) // Met à jour l'état local
    setAmenities(updatedAmenities) // Met à jour les props via la fonction passée
  }

  return (
    <div className="space-y-4">
      {accessoires.map(accessoire => {
        const isChecked = localAmenities.some(item => item.id === accessoire.id)

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
