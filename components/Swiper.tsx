'use client'

import { useContext, useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Autoplay, A11y, Pagination, Scrollbar } from 'swiper/modules'
import UrlConfig from '@/util/config'
import LocationContext from '@/layouts/context/locationContext'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'

interface AccommodationImage {
  name: string
  note: number
  static: boolean
  src: string
}

const initialImages: AccommodationImage[] = [
  { name: "Hotel LUXURA", note: 4, static: true, src: "/images/hotel/chambre.jpg" },
  { name: "Hotel SPan", note: 2, static: true, src: "/images/hotel/hotel.jpg" },
  { name: "Hotel Brajas", note: 3, static: true, src: "/images/hotel/chambre.jpg" },
  { name: "Hotel Vahiny", note: 4, static: true, src: "/images/hotel/hotel2.jpg" },
  { name: "Hotel Le louvre", note: 5, static: true, src: "/images/hotel/chambre.jpg" }
]

export default function SwiperCarousel() {
  const [accommodations, setAccommodations] = useState<AccommodationImage[]>(initialImages)
  const { location } = useContext(LocationContext)
  const swiperRef = useRef<any>(null)

  useEffect(() => {
    if (location) {
      setAccommodations(initialImages)
      fetch(`${UrlConfig.apiBaseUrl}/api/hebergement/get-image-location/${location}/`)
        .then(response => response.json())
        .then(data => {
          if (data.length < 5) {
            const additionalImages = initialImages.slice(0, 5 - data.length)
            setAccommodations([...data, ...additionalImages])
          } else {
            setAccommodations(data)
          }

          if (swiperRef.current && swiperRef.current.swiper) {
            swiperRef.current.swiper.autoplay.stop()
            swiperRef.current.swiper.slideTo(0)
            setTimeout(() => {
              swiperRef.current.swiper.autoplay.start()
            }, 100)
          }
        })
        .catch(error => console.error('Error fetching accommodations:', error))
    }
  }, [location])

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
      speed={3000}
      centeredSlides={true}
      freeMode={true}
      loopAdditionalSlides={1}
      onSwiper={(swiper) => swiper.autoplay.start()}
      className="w-full h-[400px]"
    >
      {accommodations.map((img, index) => (
        <SwiperSlide key={index}>
          <Image
            src={!img.static ? `${UrlConfig.apiBaseUrl + img.src}` : `${img.src}`}
            alt={`Slide ${index + 1}`}
            width={800}
            height={600}
            className="object-cover w-full h-full"
          />
        </SwiperSlide>
      ))}
      <SwiperSlide>
        <Image
          src="/images/hotel/hotel.jpg"
          alt="metal sculpture"
          width={800}
          height={600}
          className="object-cover w-full h-full"
        />
      </SwiperSlide>
    </Swiper>
  )
}

