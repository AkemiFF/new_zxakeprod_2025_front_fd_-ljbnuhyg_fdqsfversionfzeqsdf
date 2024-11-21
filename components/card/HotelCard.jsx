import { Image } from 'primereact/image';
import style from './../../style/components/card/HotelCard.module.css';
import { Rating } from 'primereact/rating';
import { ScrollPanel } from 'primereact/scrollpanel';
import { Button } from 'primereact/button';
import { useRouter } from 'next/router';
import { checkIfClientLikedAccomodation, LikeAccomodation } from '@/util/Like';
import { useState, useContext, useEffect, useRef } from 'react';
import LayoutContext from '@/layouts/context/layoutContext';
import { Toast } from 'primereact/toast';
import Link from 'next/link';

export default function HotelCard(props) {
    const toast = useRef(null);


    const [nbLike, setNbLike] = useState(props.nb_like);
    const [isLiked, setIsLiked] = useState(false);
    const [baseprice, setBaseprice] = useState();
    const { user } = useContext(LayoutContext);
    const router = useRouter();
    useEffect(() => {
        const fetchLikeStatus = () => {
            if (props.id) {
                checkIfClientLikedAccomodation(props.id).then((liked) => {
                    setIsLiked(liked);
                }).catch((error) => {
                    console.error('Error fetching like status:', error);
                });
            }
        };

        if (user) {
            fetchLikeStatus();
        }
    }, [props.id, user]);
    useEffect(() => {
        if (props.price) {
            const base = `from ${props.price} $/night`
            setBaseprice(base);
        } else {
            setBaseprice("Aucune chambre disponible");

        }
    }, [props.price]);
    const handleLikeClick = () => {
        if (!user) {
            toast.current.show({
                severity: 'info',
                summary: 'Not Connecter',
                detail: <>No user connected <Link href="/users/login">Login here</Link>.</>,
                life: 5000
            });
            return;
        }
        if (props.id) {
            LikeAccomodation(props.id).then(() => {
                setIsLiked((prev) => !prev);
                setNbLike((prevNbLike) => (isLiked ? prevNbLike - 1 : prevNbLike + 1));
            }).catch((error) => {
                console.error('Error liking the product:', error);
            });
        } else {
            console.error('Accomodation is undefined');
        }
    };
    return (
        <div className={style.container}>
            <Image alt='Hotel' src={props.img} className={style.image_container} imageClassName={style.image} />
            <div className={style.hotel_container}>
                <div className={style.hotel_container_top}>
                    <div className={style.hotel_container_top_left}>
                        <Rating
                            value={props.rate}
                            disabled
                            cancel={false}
                            pt={{
                                onIcon: () => ({
                                    style: {
                                        "color": "#FFD700"
                                    }
                                })
                            }}
                        />
                        <span className={style.note}>{props.rate}</span>
                        <span className={style.view}>{props.avis_hotel} ( reviews ){props.avis_hotel > 1 ? "s" : ""}</span>
                    </div>
                    <span className={style.hotel_container_top_right}>
                        {/* from {props.price}$/night */}
                        {baseprice}
                    </span>
                </div>
                <div className={style.hotel_title_container}>
                    <span className={style.hotel_title}>{props.name}</span>
                    <span className={style.hotel_title_label}>{props.localisation}</span>
                </div>
                <ScrollPanel style={{ height: "56px" }}>
                    <span className={style.hotel_description}>{props.description}</span>
                </ScrollPanel>
                <div className={style.bottom}>
                    <Button onClick={handleLikeClick} className='button-secondary' label='Like' icon={`pi ${isLiked ? 'pi-heart-fill' : 'pi-heart'}`} raised><span>{nbLike}</span></Button>
                    <Button onClick={() => { router.push(props.href) }} className='button-primary' label='See availability' raised />
                </div>
            </div>
            <Toast ref={toast} />
        </div>
    )
}