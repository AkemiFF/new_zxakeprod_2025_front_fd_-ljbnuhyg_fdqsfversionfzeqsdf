import { Image } from 'primereact/image';
import style from './../../style/components/responsable/TourCard.module.css';

export default function TourCard({ nom_voyage, onClick, selected }) {
    return (
        <div onClick={onClick} className={`${style.container} ${selected ? style.selected : ''}`}>
            <Image src='/images/tours/aventure.png' imageClassName={style.image} alt=''/>
            <div className={style.tour_detail}>
                <span className={style.title}>{nom_voyage}</span>
                <div className={style.detail}>
                    <span><i className='pi pi-clock'/>23 Jul 2024 - 28 Jul 2024</span>
                    <span><i className='pi pi-map-marker'/>Antananrivo - Morondava -Toliara</span>
                </div>
            </div>
        </div>
    );
}
