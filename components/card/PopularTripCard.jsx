import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ScrollPanel } from 'primereact/scrollpanel';
import style from './../../style/components/card/PopularTripCard.module.css';

export default function PopularTripCard({ voyage }) {
    const router = useRouter();
    const imageUrl = voyage && voyage.couverture_images && voyage.couverture_images.length > 0
        ? `${UrlConfig}${voyage.couverture_images[0].image}`
        : '/images/default-image.jpg';

    return (
        <div className={style.container}>
            <Image className={style.image} src={imageUrl} alt={voyage?.nom_voyage || 'Default Title'} width={320} height={239} />
            <div className={style.wrapper}>
                <div className={style.title_container}>
                    <div className={style.title_wrapper}>
                        <span className={style.title}>{voyage?.nom_voyage || 'Default Title'}</span>
                        <span className={style.subtitle}>
                            <i style={{ fontSize: "12px" }} className='pi pi-user' />
                            <span>{voyage?.nom_tour_operateur || 'Default Operator'}</span>
                        </span>
                    </div>
                    <div className={style.position}>
                        <i style={{ fontSize: "12px" }} className='pi pi-map-marker' />
                        <span>{voyage?.ville_depart || 'Unknown City'} - {voyage?.destination_voyage || 'Unknown Destination'}</span>
                    </div>
                </div>
                <ScrollPanel style={{ width: '100%', height: '70px' }}>
                    <span className={style.label}>{voyage?.description_voyage || 'No Description Available'}</span>
                </ScrollPanel>
                <button onClick={() => router.push(`/users/tour/${voyage?.id}`)} className={style.button}>
                    View
                </button>
            </div>

            <div className={style.distance}>
                <Image src={"/images/tours/road.svg"} alt='star' width={14} height={14} />
                <span>{voyage?.prix_voyage || 'N/A'} km</span>
            </div>
            <div className={style.like}>
                <Image src={"/images/heart.svg"} alt='star' width={14} height={14} />
                <span>{voyage?.like_count || 0} </span>
            </div>
        </div>
    )
}
