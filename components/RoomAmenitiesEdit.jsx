import { useState, useEffect } from 'react';
import style from '@/style/pages/responsable/accommodation/addNewRoom.module.css'
import { UrlConfig } from '@/util/config';

const RoomAmenitiesEdit = ({ setAmenitiesEdit, initialAmenities }) => {
    const [accessoires, setAccessoires] = useState([]);
    const [selectedAmenities, setSelectedAmenities] = useState([]);

    useEffect(() => {
        fetch(`${UrlConfig.apiBaseUrl}/api/hebergement/accessoires-chambre/`)
            .then(response => response.json())
            .then(data => {
                setAccessoires(data);
                // Set initial selected amenities
                const initialSelected = data.filter(accessoire => 
                    initialAmenities.some(amenity => amenity.id === accessoire.id)
                );
                setSelectedAmenities(initialSelected);
            })
            .catch(error => {
                console.error('Erreur lors de la récupération des accessoires :', error);
            });
    }, [initialAmenities]);

    const handleCheckboxChange = (accessoire, isChecked) => {
        if (isChecked) {
            setSelectedAmenities(prev => [...prev, accessoire]);
            setAmenitiesEdit(prev => [...prev, accessoire]);
        } else {
            setSelectedAmenities(prev => prev.filter(item => item.id !== accessoire.id));
            setAmenitiesEdit(prev => prev.filter(item => item.id !== accessoire.id));
        }
    };

    return (
        <div className={style.room_ammenties}>
            {accessoires.map(accessoire => (
                <div key={accessoire.id} className={style.room_ammenties_check_container}>
                    <input 
                        type="checkbox" 
                        id={`accessoire-${accessoire.id}`}
                        checked={selectedAmenities.some(item => item.id === accessoire.id)}
                        onChange={(e) => handleCheckboxChange(accessoire, e.target.checked)}
                    />
                    <label htmlFor={`accessoire-${accessoire.id}`}>{accessoire.nom_accessoire}</label>
                </div>
            ))}
        </div>
    );
}

export default RoomAmenitiesEdit;
