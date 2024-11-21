import { Dialog } from 'primereact/dialog';
import style from './../style/components/GallerieHotel.module.css';
import { Galleria } from "primereact/galleria";
import { Image } from "primereact/image";
import { useEffect, useRef, useState } from "react";
import { UrlConfig } from '@/util/config';

export default function GallerieHotel(props) {

    const gallerie = useRef(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const [allPhotoVisible, setAllPhotoVisible] = useState(false);



    const nombreImageNonAffiche = () => {
        let nombreImage = props.images.length;
        return nombreImage - 5;
    }


    const itemTemplate = (item) => {
        return <Image alt='image' style={{ width: '100%', display: 'block' }} src={UrlConfig.apiBaseUrl + item.image} />;
    }
    const thumbnails = (item) => {
        return <Image alt='image' style={{ display: 'block' }} src={UrlConfig.apiBaseUrl + item.image} />;
    }





    return (
        <>
            <Galleria
                ref={gallerie}
                value={props.images}
                numVisible={7}
                activeIndex={activeIndex}
                onItemChange={(e) => setActiveIndex(e.index)}
                circular
                fullScreen
                showItemNavigators
                showThumbnails={false}
                item={itemTemplate}
                thumbnail={thumbnails}
            />
            <div className={style.container}>
                {
                    props.images && props.images.map((image, index) => {
                        if (index == 0) {
                            return <Image
                                key={index}
                                style={{ cursor: 'pointer' }}
                                onClick={() => { setActiveIndex(index); gallerie.current.show() }}
                                src={UrlConfig.apiBaseUrl + image.image}
                                imageClassName={style.firstImage}
                                alt='image'
                                className={style.firstImage_container}
                            />;
                        }
                    })
                }
                <div className={style.other_image_container}>
                    {
                        props.images && props.images.map((image, index) => {
                            if (index != 0 && index < 4) {
                                return <Image
                                    key={index}
                                    style={{ cursor: 'pointer' }}
                                    onClick={() => { setActiveIndex(index); gallerie.current.show() }}
                                    src={UrlConfig.apiBaseUrl + image.image}
                                    imageClassName={style.otherImage}
                                    alt='image'
                                />;
                            }
                        })
                    }
                    {
                        props.images && props.images.map((image, index) => {
                            if (index == 4) {
                                return (
                                    <div key={index} onClick={() => setAllPhotoVisible(true)} className={style.all_otherImage_container}>
                                        <Image
                                            key={index}
                                            style={{ cursor: 'pointer' }}
                                            src={UrlConfig.apiBaseUrl + image.image}
                                            imageClassName={style.otherImage}
                                            alt='image'
                                        />
                                        <div className={style.all_otherImage}>
                                            +{nombreImageNonAffiche()} photo{nombreImageNonAffiche() < 1 ? "" : "s"}
                                        </div>
                                    </div>
                                )
                            }
                        })
                    }
                </div>
            </div>

            <Dialog onHide={() => setAllPhotoVisible(false)} visible={allPhotoVisible} maximizable style={{ width: '70vw' }}>
                <div className={style.listePhoto}>
                    {
                        props.images && props.images.map((image, index) => {
                            return <Image
                                key={index}
                                style={{ cursor: 'pointer' }}
                                onClick={() => { setActiveIndex(index); gallerie.current.show() }}
                                src={UrlConfig.apiBaseUrl + image.image}
                                imageClassName={style.list_image_item}
                                alt='image'
                            />;
                        })
                    }
                </div>
            </Dialog>
        </>
    )
}