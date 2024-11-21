import { Image } from 'primereact/image';
import { ScrollPanel } from 'primereact/scrollpanel';
import style from '../../style/components/card/BookingHotelCard.module.css';
export default function BookingHotelCard(props) {

    const getNombreJour = (date1, date2) => {
        if (props.check_in && props.check_out) {
            let dateMin = date1 < date2 ? date1 : date2;
            let dateMax = date1 > date2 ? date1 : date2;
            const differenceInTime = dateMax.getTime() - dateMin.getTime();
            return (differenceInTime / (1000 * 3600 * 24)) + 1;
        }
        return 1;
    }

    const totalRoom = (price) => {
        return (parseFloat(price) * getNombreJour(props.check_in, props.check_out));
    }

    return (
        <div className={style.container}>
            <div className={style.image_container}>
                <Image imageClassName={style.image} alt={props.hotel_image.image} src={UrlConfig + props.hotel_image.image} />
                <div className={style.image_detail_container}>
                    <span className={style.image_title}>Place to stay | {props.hotel_name}</span>
                    <div className={style.image_label_container}>
                        <i style={{ fontSize: "12px" }} className='pi pi-map-marker' />
                        <span>{props.hotel_location}</span>
                    </div>
                </div>
            </div>
            <ScrollPanel style={{ width: "320px", height: "241px" }}>
                <div className={style.detail_container}>
                    <div className={style.tour_container}>
                        <span className={style.detail_title}>Tour stay summary</span>
                        <div className={style.separateur}></div>
                        {props.check_in != null && (<div className={style.tour_detail_container}>
                            <span className={style.tour_detail}>Check-in</span>
                            <span className={style.tour_value}>{props.check_in.toLocaleDateString()}</span>
                        </div>)}
                        {props.check_out != null && (<div className={style.tour_detail_container}>
                            <span className={style.tour_detail}>Check-out</span>
                            <span className={style.tour_value}>{props.check_out.toLocaleDateString()}</span>
                        </div>)}
                        {props.guest != null && (<div className={style.tour_detail_container}>
                            <span className={style.tour_detail}>Guest</span>
                            <span className={style.tour_value}>{props.guest}</span>
                        </div>)}

                    </div>
                    <div className={style.tour_container}>
                        <span className={style.detail_title}>Price breakdown</span>
                        <div className={style.separateur}></div>
                        {props.rooms.length != 0 && props.rooms.map(room => {
                            return (
                                <>
                                    <span style={{ fontSize: 13 }}>Chambre : {room.chambre.type_chambre}</span>
                                    <div className={style.tour_detail_container}>
                                        <span className={style.tour_detail}>${room.prix_nuit_chambre} x {getNombreJour(props.check_in, props.check_out)} night</span>
                                        <span className={style.tour_value}>${totalRoom(room.prix_nuit_chambre)}</span>
                                    </div>
                                </>
                            )
                        })}
                        {/* <div className={style.tour_detail_container}>
                            <span className={style.tour_detail}>Cleaning fee</span>
                            <span className={style.tour_value}>$1.75</span>
                        </div>
                        <div className={style.tour_detail_container}>
                            <span className={style.tour_detail}>AirBnb fee</span>
                            <span className={style.tour_value}>$3</span>
                        </div> */}

                    </div>
                </div>
            </ScrollPanel>
        </div>
    )
}