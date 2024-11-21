import { Button } from 'primereact/button';
import style from './../../style/components/card/DetailTravel.module.css';
export default function DetailTravel(props) {


    return (
        <div className={style.container}>
            <div className={style.head_container}>
                <span className={style.head_title}>Travel Details</span>
            </div>
            <div className={style.body_container}>
                <div className={style.detail_container}>
                    <span className={style.detail_label}>Start</span>
                    <span>{props.date_debut}</span>
                </div>
                <div className={style.detail_container}>
                    <span className={style.detail_label}>End</span>
                    <span>{props.date_fin}</span>
                </div>
                <div className={style.detail_container}>
                    <span className={style.detail_label}>Available place</span>
                    <span>{props.places_disponibles}</span>
                </div>
                <div className={style.detail_container}>
                    <span className={style.detail_label}>Price</span>
                    <span>$ {props.prix_voyage}</span>
                </div>
                <div className={style.detail_container}>
                    <span className={style.detail_label}>Transportation</span>
                    <span>Land</span>
                </div>
            </div>
            <div className={style.description}>
                On vous souhaite bon voyage
            </div>
            <Button className={style.bouton} onClick={() => props.setBookingVisible(true)} label='Book trip' />
        </div>
    )
}