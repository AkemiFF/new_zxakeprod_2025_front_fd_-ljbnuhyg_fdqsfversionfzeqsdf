// components/Carousel.js
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import style from '@/style/components/Carousel.module.css';


import { Navigation, A11y, Pagination, Scrollbar, Autoplay } from 'swiper/modules';
import { Image } from 'primereact/image';
import { useContext, useEffect, useRef, useState } from 'react';
import UrlConfig from '@/util/config';
import LocationContext from '@/layouts/context/locationContext';
const images = [
    {
        name: "Hotel LUXURA",
        note: 4,
        static: true,
        src: "/images/hotel/chambre.jpg"
    },
    {
        name: "Hotel SPan",
        note: 2,
        static: true,
        src: "/images/hotel/hotel.jpg"
    },
    {
        name: "Hotel Brajas",
        note: 3,
        static: true,
        src: "/images/hotel/chambre.jpg"
    },
    {
        name: "Hotel Vahiny",
        note: 4,
        static: true,
        src: "/images/hotel/hotel2.jpg"
    },
    {
        name: "Hotel Le louvre",
        note: 5,
        static: true,
        src: "/images/hotel/chambre.jpg"
    }
]

const SwiperCarousel = () => {

    const [accommodations, setAccommodations] = useState(images);
    const { location, setLocation } = useContext(LocationContext);
    const swiperRef = useRef(null);

    useEffect(() => {
        if (location) {
            setAccommodations(images)
            fetch(`${UrlConfig.apiBaseUrl}/api/hebergement/get-image-location/${location}/`)
                .then(response => response.json())
                .then(data => {
                    if (data.length < 5) {
                        const additionalImages = images.slice(0, 5 - data.length);
                        setAccommodations([...data, ...additionalImages]);
                    } else {
                        setAccommodations(data);
                    }

                    // if (swiperRef.current && swiperRef.current.swiper) {
                    if (swiperRef.current && swiperRef.current.swiper) {
                        swiperRef.current.swiper.autoplay.stop();
                        swiperRef.current.swiper.slideTo(0); // Revenir à la première slide pour éviter le glitch
                        setTimeout(() => {
                            swiperRef.current.swiper.autoplay.start();
                        }, 100);
                    }
                })
                .catch(error => console.error('Error fetching accommodations:', error));
        }
    }, [location]);

    return (
        <Swiper
            ref={swiperRef}
            modules={[Navigation, Autoplay, A11y, Pagination, Scrollbar]}
            spaceBetween={-5}
            slidesPerView={2}

            direction='horizontal'
            loop={true}
            autoplay={{
                delay: 1,
                disableOnInteraction: false,
                pauseOnMouseEnter: false,
            }}
            cubeEffect={{ slideShadows: true }}
            speed={3000}
            centeredSlides={true}
            freeMode={true}
            loopAdditionalSlides={1}
            onSwiper={(swiper) => swiper.autoplay.start()}
        // onSlideChange={() => console.log("Slide changed")}

        >
            {accommodations.map((img, index) => (
                <SwiperSlide key={index}>
                    <Image
                        src={!img.static ? `${UrlConfig.apiBaseUrl + img.src}` : `${img.src}`}
                        imageClassName={style.image_src} alt={`Slide ${index + 1}`} />
                </SwiperSlide>

            ))}

            <SwiperSlide >
                <Image src="/images/hotel/hotel.jpg" imageClassName={style.image_src} alt="metal sculpture" />
            </SwiperSlide>
        </Swiper>
    );
};

export default SwiperCarousel;
