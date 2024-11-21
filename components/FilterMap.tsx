'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api'

export default function FilterMap(props) {
  const router = useRouter()
  const [position, setPosition] = useState({
    latitude: -18,
    longitude: 47
  })

  const openMap = () => {
    router.push(`https://www.google.com/maps/@${props.lat},${props.lng},13.66?entry=ttu`)
  }

  const hotelMarkerIcon = {
    url: 'https://maps.google.com/mapfiles/kml/shapes/lodging.png',
    scaledSize: { width: 30, height: 30 }
  }

  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setPosition(position.coords)
        },
        (error) => {
          console.log(error)
        }
      )
    }
  }, [])

  return (
    <div className="w-full h-[400px] relative">
      <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAP_API}>
        <GoogleMap
          mapContainerClassName="w-full h-full"
          center={{ lat: position.latitude, lng: position.longitude }}
          zoom={16}
          options={{ mapTypeId: 'satellite' }}
        >
          <Marker
            position={{ lat: position.latitude, lng: position.longitude }}
            title="Your position"
          />
          {props.positions && props.positions.map((p, index) => (
            <Marker
              key={index}
              icon={hotelMarkerIcon}
              position={{ lat: p.latitude, lng: p.longitude }}
              title={p.adresse}
            />
          ))}
        </GoogleMap>
      </LoadScript>
    </div>
  )
}

