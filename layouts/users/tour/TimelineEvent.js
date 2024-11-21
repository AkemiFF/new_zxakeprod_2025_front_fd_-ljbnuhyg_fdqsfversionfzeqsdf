import React from 'react';
import { Timeline } from 'primereact/timeline';
import style from './../../../style/layouts/users/tour/TimelineEvent.module.css';

// Fonction pour générer les trajets avec ville_depart et destination_voyage
const generateTrips = (trajets, ville_depart, destination_voyage) => {
    const trips = [];

    // Ajouter le premier trajet avec ville_depart
    if (trajets.length > 0) {
        const firstTrajet = trajets[0];
        trips.push({
            date: firstTrajet.date_trajet,
            name: `${ville_depart || 'Unknown City'} - ${firstTrajet.nom_ville}`,
            description: firstTrajet.description_trajet || 'No description available'
        });
    }

    // Ajouter les trajets intermédiaires
    for (let i = 0; i < trajets.length - 1; i++) {
        const currentTrajet = trajets[i];
        const nextTrajet = trajets[i + 1];

        trips.push({
            date: currentTrajet.date_trajet,
            name: `${currentTrajet.nom_ville} - ${nextTrajet.nom_ville}`,
            description: currentTrajet.description_trajet || 'No description available'
        });
    }

    // Ajouter le dernier trajet avec destination_voyage
    if (trajets.length > 0) {
        const lastTrajet = trajets[trajets.length - 1];
        trips.push({
            date: lastTrajet.date_trajet,
            name: `${lastTrajet.nom_ville} - ${destination_voyage || 'Unknown Destination'}`,
            description: lastTrajet.description_trajet || 'No description available'
        });
    }

    return trips;
};

export default function TimelineEvent({ voyage }) {
    // Vérifier que les données du voyage sont présentes
    const { trajets, ville_depart, destination_voyage } = voyage || {};

    // Vérifier que les props ne sont pas undefined
    const validVilleDepart = ville_depart || 'Unknown City';
    const validDestinationVoyage = destination_voyage || 'Unknown Destination';

    // Générer les trajets avec ville_depart et destination_voyage
    const trips = generateTrips(trajets || [], validVilleDepart, validDestinationVoyage);

    const numero = (item, index) => {
        return <span className={style.numero}>{index + 1}</span>;
    };

    const evenementTemplate = (item) => {
        return (
            <div className={style.evenement_container}>
                <div className={style.evenement_head}>
                    <span className={style.evenementDate}>{item.date}</span>
                    <span className={style.evenementTitle}>{item.name}</span>
                </div>
                <div className={style.description}>
                    {item.description || 'No description available'}
                </div>
            </div>
        );
    };

    return (
        <Timeline
            pt={{
                connector: { className: style.connector }
            }}
            className={style.container}
            value={trips}
            align='left'
            marker={numero}
            content={evenementTemplate}
        />
    );
}
