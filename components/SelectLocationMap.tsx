'use client'

import React, { useState, useCallback } from 'react'
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api'

const mapContainerStyle = {
  width: '100%',
  height: '400px',
}

const center = {
  lat: -18.8792,
  lng: 47.5079,
}

interface Location {
  lat: number
  lng: number
}

interface SelectLocationMapProps {
  onLocationSelect: (location: Location) => void
  onchangeAddress: (address: string) => void
}

export default function SelectLocationMap({ onLocationSelect, onchangeAddress }: SelectLocationMapProps) {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_API || '',
  })

  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null)
  const [locationDetails, setLocationDetails] = useState<google.maps.GeocoderResult | null>(null)

  const onMapClick = useCallback((event: google.maps.MapMouseEvent) => {
    if (event.latLng) {
      const location = {
        lat: event.latLng.lat(),
        lng: event.latLng.lng(),
      }
      setSelectedLocation(location)
      onLocationSelect(location)
      const geocoder = new window.google.maps.Geocoder()
      geocoder.geocode({ location: location }, (results, status) => {
        if (status === 'OK') {
          if (results && results[0]) {
            onchangeAddress(results[0].formatted_address)
            setLocationDetails(results[0])
          } else {
            console.log('Aucun résultat trouvé')
          }
        } else {
          console.error('Geocoder a échoué en raison de : ' + status)
        }
      })
    }
  }, [onLocationSelect, onchangeAddress])

  if (loadError) return <div>Error loading maps</div>
  if (!isLoaded) return <div>Loading Maps</div>

  return (
    <div>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={12}
        center={center}
        onClick={onMapClick}
      >
        {selectedLocation && <Marker position={selectedLocation} />}
      </GoogleMap>
      {selectedLocation && (
        <div className="mt-4">
          <p className="text-sm text-gray-600">{locationDetails ? locationDetails.formatted_address : ""}</p>
        </div>
      )}
    </div>
  )
}

