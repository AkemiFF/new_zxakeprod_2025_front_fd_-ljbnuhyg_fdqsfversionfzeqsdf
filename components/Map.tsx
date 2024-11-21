'use client'

import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api"

interface MapProps {
  style?: React.CSSProperties
  lat: number
  lng: number
  name: string
}

export default function Map({ style, lat, lng, name }: MapProps) {
  return (
    <div style={style}>
      <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAP_API || ''}>
        <GoogleMap
          mapContainerStyle={{ width: "100%", height: "100%" }}
          center={{ lat, lng }}
          zoom={16}
          options={{ mapTypeId: 'satellite' }}
        >
          <Marker
            position={{ lat, lng }}
            title={name}
          />
        </GoogleMap>
      </LoadScript>
    </div>
  )
}

