// components/RoomAmenities.js
import { UrlConfig } from '@/util/config';
import { useState, useEffect } from 'react';
// import style from './RoomAmenities.module.css';
import style from '@/style/pages/responsable/accommodation/addNewRoom.module.css'

const RoomAmenities = ({ setAmenities, selectedAmenities = [] }) => {
    const [accessoires, setAccessoires] = useState([]);

    // Charger les accessoires disponibles depuis l'API
    useEffect(() => {
        fetch(`${UrlConfig.apiBaseUrl}/api/hebergement/accessoires-chambre/`)
            .then(response => response.json())
            .then(data => {
                setAccessoires(data);
            })
            .catch(error => {
                console.error('Erreur lors de la récupération des accessoires :', error);
            });
    }, []);

    // Gérer le changement d'état des cases à cocher
    const handleCheckboxChange = (amenity, isChecked) => {
        if (isChecked) {
            setAmenities(prev => [...prev, amenity]); // Ajouter l'accessoire
        } else {
            setAmenities(prev => prev.filter(item => item.id !== amenity.id)); // Supprimer l'accessoire
        }
    };

    return (
        <div className={style.room_ammenties}>
            {accessoires.map(accessoire => {
                const isChecked = selectedAmenities.some(item => item.id === accessoire.id); // Vérifie si déjà sélectionné

                return (
                    <div key={accessoire.id} className={style.room_ammenties_check_container}>
                        <input
                            type="checkbox"
                            id={`accessoire-${accessoire.id}`}
                            checked={isChecked} // Précocher si déjà dans les selectedAmenities
                            onChange={(e) => handleCheckboxChange(accessoire, e.target.checked)}
                        />
                        <label htmlFor={`accessoire-${accessoire.id}`}>{accessoire.nom_accessoire}</label>
                    </div>
                );
            })}
        </div>
    );
}

export default RoomAmenities;
