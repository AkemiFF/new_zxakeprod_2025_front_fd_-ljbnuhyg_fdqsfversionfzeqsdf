import style from './../style/components/FilterMap.module.css';
import { useRouter } from 'next/router';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { useEffect, useState } from 'react';
export default function FilterMap(props) {

    const router = useRouter();
    const [position,setPosition] = useState({
        latitude:-18,
        longitude:47
    });

    const openMap = () =>{
        router.push(`https://www.google.com/maps/@${props.lat},${props.lng},13.66?entry=ttu`);
    }

    const hotelMarkerIcon = {
        url: 'https://maps.google.com/mapfiles/kml/shapes/lodging.png', 
        scaledSize: { width: 30, height: 30 }
    };


    useEffect(()=>{
        if('geolocation' in navigator){
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setPosition(position.coords);
                },
                (error) => {
                    console.log(error);
                }
            );
        }
    },[])

    return(
        <div className={style.container}>
            <div className={style.container} style={{zIndex:2}}>
                <LoadScript
                    googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAP_API}
                >
                    <GoogleMap
                        mapContainerClassName={style.map}
                        center={{lat:position.latitude,lng:position.longitude}}
                        zoom={16}
                        options={{ mapTypeId: 'satellite' }}
                    >
                        <Marker
                            position={{lat:position.latitude,lng:position.longitude}}
                            title={"Your position"}
                        />
                        {props.positions && props.positions.map((p,index)=>{
                            return(
                                <Marker
                                    key={index}
                                    icon={hotelMarkerIcon}
                                    position={{lat:p.latitude,lng:p.longitude}}
                                    title={p.adresse}
                                />
                            )
                        })}
                    </GoogleMap>
                    
                </LoadScript>
            </div>
        </div>
    );
}