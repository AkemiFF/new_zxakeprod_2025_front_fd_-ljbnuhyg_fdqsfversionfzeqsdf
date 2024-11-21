// components/Carousel.js
import React, { useEffect } from 'react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import styles from '@/style/pages/users/accommodation/accommodation.module.css';
import Swiper from 'swiper';
import 'swiper/css/scrollbar';
import { Image } from 'primereact/image';
import style from '@/style/pages/users/handcraft/handraft.module.css';
import { Navigation, A11y, Pagination, Scrollbar, Autoplay } from 'swiper/modules';
import { SwiperSlide } from 'swiper/react';


const CarouselContinu = () => {
    useEffect(() => {
        new Swiper('.swiper', {


            pagination: {
                el: '.swiper-pagination',
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },

            scrollbar: {
                el: '.swiper-scrollbar',
            },

            modules: [Navigation, Autoplay, A11y, Pagination, Scrollbar],
            direction: 'horizontal',
            loop: true,
            speed: 4000,
            spaceBetween: -5,
            slidesPerView: 5,
            autoplay: {
                delay: 1,
                disableOnInteraction: false,
                pauseOnMouseEnter: false,
            },
            slidesPerGroupAuto: true,
            centeredSlides: true,
            freeMode: true,
        });
    }, []);

    return (
        <div className={styles.swiper}>
            <div className="swiper-wrapper">
                <SwiperSlide className="swiper-slide">
                    <Image src="/images/artisanat/sculptur-metal.png" imageClassName={style.image_categorie} alt="metal sculpture" />
                </SwiperSlide>
                <SwiperSlide className="swiper-slide">
                    <Image src="/images/artisanat/sculptur-metal.png" imageClassName={style.image_categorie} alt="metal sculpture" />
                </SwiperSlide>
                <SwiperSlide className="swiper-slide">
                    <Image src="/images/artisanat/sculptur-metal.png" imageClassName={style.image_categorie} alt="metal sculpture" />
                </SwiperSlide>
                <SwiperSlide className="swiper-slide">
                    <Image src="/images/artisanat/sculptur-metal.png" imageClassName={style.image_categorie} alt="metal sculpture" />
                </SwiperSlide>
                <div className="swiper-slide">
                    <Image src="/images/artisanat/tapisserie.png" imageClassName={style.image_categorie} alt="tapestry" />
                </div>
                <div className="swiper-slide">
                    <Image src="/images/artisanat/bijou.png" imageClassName={style.image_categorie} alt="jewelry" />
                </div>
                {/* Ajoute d'autres SwiperSlide ici */}
            </div>
            <div className="swiper-pagination"></div>
            <div className="swiper-button-prev"></div>
            <div className="swiper-button-next"></div>
            <div className="swiper-scrollbar"></div>
        </div>
    );
};

export default CarouselContinu;
