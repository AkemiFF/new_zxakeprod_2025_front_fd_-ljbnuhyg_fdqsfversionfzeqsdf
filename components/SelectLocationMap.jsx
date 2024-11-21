import React, { useState, useCallback } from 'react';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';

const mapContainerStyle = {
    width: '100%',
    height: '400px',
};

const center = {
    lat: -18.8792,
    lng: 47.5079,
};

const SelectLocationMap = ({ onLocationSelect, onchangeAddress }) => {
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_API,
    });

    const [selectedLocation, setSelectedLocation] = useState(null);
    const [locationDetails, setLocationDetails] = useState(null);

    const onMapClick = useCallback((event) => {

        const location = {
            lat: event.latLng.lat(),
            lng: event.latLng.lng(),
        };
        setSelectedLocation(location);
        onLocationSelect(location);
        const geocoder = new window.google.maps.Geocoder();
        geocoder.geocode({ location: location }, (results, status) => {
            if (status === 'OK') {
                if (results[0]) {
                    onchangeAddress(results[0].formatted_address);
                    setLocationDetails(results[0]);
                } else {
                    console.log('Aucun résultat trouvé');
                }
            } else {
                console.error('Geocoder a échoué en raison de : ' + status);
            }
        });

    }, [onLocationSelect, onchangeAddress]);


    if (loadError) return <div>Error loading maps</div>;
    if (!isLoaded) return <div>Loading Maps</div>;

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
                <div>
                    <p>{locationDetails ? locationDetails.formatted_address : ""}</p>
                </div>
            )}
        </div>
    );
};

export default SelectLocationMap;
