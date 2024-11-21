import React, { useEffect, useState } from 'react';
import { Dialog } from 'primereact/dialog';
import style from '../../style/components/modal/DetailChambre.module.css';
import { Image } from 'primereact/image';
import { UrlConfig } from '@/util/config';
import { Masonry } from '@mui/lab';

export default function DetailChambre(props) {
    const [roomData, setRoomData] = useState(null);

    useEffect(() => {
        if (props.visible && props.id) {
            fetch(`${UrlConfig.apiBaseUrl}/api/hebergement/get-id-chambre/${props.id}/`)
                .then(response => response.json())
                .then(data => setRoomData(data))
                .catch(error => console.error('Error fetching room data:', error));
        }
    }, [props.visible, props.id]);

    const headerTemplate = () => {
        return (
            <div>
                <span>Accommodation/ Hotel /{roomData.hebergement.nom_hebergement}</span>
            </div>
        );
    };

    if (!roomData) {
        return null;
    }

    return (
        <Dialog draggable={false} header={headerTemplate} className={style.dialog_container} visible={props.visible} onHide={props.onHide}>
            <div className={style.container}>
                <div className={style.left}>
                    {roomData.images_chambre.map((image, index) => {
                        const imageUrl = `${UrlConfig.apiBaseUrl}${image.images}`;
                        if (index===0) {
                            return <div key={image.id} className={style.firstImage}>
                                        <Image
                                            className={style.firstImage_container}
                                            imageClassName={style.firstImage}
                                            src={imageUrl}
                                            alt={`Room Image ${index}`}
                                            onError={(e) => e.target.src = '/path/to/placeholder-image.jpg'} // Optionnel: image de remplacement en cas d'erreur
                                        />
                                    </div>
                        }
                    })}
                    <Masonry className={style.mansory_container} columns={2} spacing={2}>
                        {roomData.images_chambre.map((image,index)=>{
                            const imageUrl = `${UrlConfig.apiBaseUrl}${image.images}`;
                            if (index!=0) {
                                return <Image
                                                key={index}
                                                className={style.otherImage_container}
                                                imageClassName={style.otherImage}
                                                src={imageUrl}
                                                alt={`Room Image ${index}`}
                                                onError={(e) => e.target.src = '/path/to/placeholder-image.jpg'} // Optionnel: image de remplacement en cas d'erreur
                                        />
                            }
                        })}
                    </Masonry>
                </div>
                <div className={style.right}>
                    <div className={style.title_container}>
                        <span className={style.title}>{roomData.chambre.type_chambre}</span>
                        <span className={style.price_container}>
                            <span className={style.price_value}>${roomData.prix_nuit_chambre}</span>
                            <span className={style.price_label}>/night</span>
                        </span>
                    </div>
                    {/* <div className={style.detail_chambre}>
                        <i className='pi pi-user'/>
                        <span className={style.detail_chambre_label}>Superficie :</span>
                        <span className={style.detail_chambre_value}>{roomData.superficie ? `${roomData.superficie} m²` : 'N/A'}</span>
                    </div> */}
                    <div className={style.detail_chambre}>
                        <i className='pi pi-user'/>
                        <span className={style.detail_chambre_label}>Type :</span>
                        <span className={style.detail_chambre_value}>{roomData.chambre.type_chambre}</span>
                    </div>
                    <div className={style.separateur}></div>
                    <div className={style.detail_container}>
                        <span className={style.detail_container_title}>Description</span>
                        <div className={style.paragraphe}>
                            {roomData.description ? roomData.description : 'No description available.'}
                        </div>
                    </div>
                    <div className={style.detail_container}>
                        <span className={style.detail_container_title}>Amenities</span>
                        <div className={style.amenties_container}>
                            {roomData.accessoires.map(accessory => (
                                <div key={accessory.id} className={style.amenties}>
                                    <span className={style.amenties_title}>
                                        <i className="pi pi-check" />
                                        {accessory.nom_accessoire}
                                    </span>
                                    {/* <div className={style.amenties_detail_container}>
                                        <span className={style.amenties_detail}>
                                            {accessory.description_accessoire ? accessory.description_accessoire : 'No description available.'}
                                        </span>
                                    </div> */}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </Dialog>
    );
}
