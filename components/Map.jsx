import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

export default function Map(props) {
    return(
        <div style={props.style}>
            <LoadScript
                googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAP_API}
            >

                    <GoogleMap
                        mapContainerStyle={{width:"100%",height:"100%"}}
                        center={{lat:props.lat,lng:props.lng}}
                        zoom={16}
                        options={{ mapTypeId: 'satellite'}}
                    >
                        <Marker
                            position={{lat:props.lat,lng:props.lng}}
                            title={props.name}
                        />
                    </GoogleMap>
            </LoadScript>
        </div>
    )
}