import style from '../../style/components/card/CardSuggestion.module.css'
import { ScrollPanel } from 'primereact/scrollpanel';
import { useState, useContext, useEffect, useRef } from 'react';
import LayoutContext from '@/layouts/context/layoutContext';
import { checkIfClientLikedAccomodation, LikeAccomodation } from '@/util/Like';
import Link from 'next/link';
import { Toast } from 'primereact/toast';
import { Image } from 'primereact/image';

export default function CardSuggestion(props) {
    const [nbLike, setNbLike] = useState(props.nb_like);
    const [isLiked, setIsLiked] = useState(false);
    const { user } = useContext(LayoutContext);
    const toast = useRef(null);



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
            console.error('Product ID is undefined');
        }
    };

    return (
        <div className={style.container}>
            <Image imageClassName={style.image} src={props.image} alt={props.name} />
            <div className={style.wrapper}>
                <div className={style.title_container}>
                    <span className={style.title}>{props.name}</span>
                    <div className={style.position}>
                        <i style={{ fontSize: "12px" }} className='pi pi-map-marker' />
                        <span>{props.localisation}</span>
                    </div>
                </div>
                <ScrollPanel style={{ width: '100%', height: '70px' }}>
                    <span className={style.label}>{props.description}</span>
                </ScrollPanel>
                <button onClick={props.onClick} className={style.button}>
                    View
                </button>
            </div>

            <div className={style.rating}>
                <Image src={"/images/star_filled.svg"} alt='star' width={14} height={14} />
                <span>{props.note}</span>
            </div>
            <button
                onClick={handleLikeClick}
                className={style.like_white}
            >
                <div
                    className={style.like_container}
                >
                    <span>{nbLike} </span>
                    <i className={`pi ${isLiked ? 'pi-heart-fill' : 'pi-heart'}`} />
                </div>


            </button>            <Toast ref={toast} />

        </div>
    );
}

