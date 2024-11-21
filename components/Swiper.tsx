'use client'

import { API_BASE_URL } from '@/util/config'
import { AnimatePresence, motion } from 'framer-motion'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { Autoplay, EffectFade, Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/effect-fade'
import 'swiper/css/navigation'

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
  const [activeIndex, setActiveIndex] = useState(0)
  const location = "Tana"
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const swiperRef = useRef<any>(null)

  useEffect(() => {
    if (location) {
      const fetchAccommodations = async () => {
        try {
          const response = await fetch(`${API_BASE_URL}/api/hebergement/get-image-location/${location}/`)
          const data = await response.json()

          if (data.length < 5) {
            const additionalImages = initialImages.slice(0, 5 - data.length)
            setAccommodations([...data, ...additionalImages])
          } else {

            setAccommodations(data)
          }
          console.log(data);

        } catch (error) {
          console.error('Error fetching accommodations:', error)
          setAccommodations(initialImages)
        }
      }

      fetchAccommodations()
    }
  }, [location])

  // Duplicate images to ensure continuous loop
  const extendedImages = [...accommodations, ...accommodations, ...accommodations]

  return (
    <div className="relative w-full h-[700px] overflow-hidden">
      <Swiper
        ref={swiperRef}
        modules={[Autoplay, EffectFade, Navigation]}
        spaceBetween={0}
        slidesPerView={3}
        loop={true}
        centeredSlides={true}
        speed={1500}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        effect="fade"
        navigation={{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        }}
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        className="w-full h-full"
      >
        {extendedImages.map((img, index) => (
          <SwiperSlide key={index} className="relative">
            <motion.div
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative w-full h-full"
            >
              <Image
                src={img.static ? img.src : `${API_BASE_URL + img.src}`}
                alt={`${img.name} - ${index + 1}`}
                fill
                priority
                className="object-cover transition-transform duration-700 ease-in-out hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                onError={(e) => {
                  e.currentTarget.src = '/placeholder.svg'; // Image de secours
                }}
              />
              <div className="absolute inset-0 bg-black/30 transition-opacity duration-300" />

              <AnimatePresence>
                {activeIndex === index % accommodations.length && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="absolute bottom-0 left-0 right-0 p-8 text-white bg-gradient-to-t from-black/70 to-transparent"
                  >
                    <h3 className="text-2xl font-bold mb-2">{img.name}</h3>
                    <div className="flex items-center gap-2">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className={`w-5 h-5 ${i < img.note ? 'text-yellow-400' : 'text-gray-400'}`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Navigation Buttons */}
      <div className="absolute top-1/2 -translate-y-1/2 z-10 w-full pointer-events-none">
        <div className="container mx-auto px-4">
          <button
            onClick={() => swiperRef.current?.swiper.slidePrev()}
            className="swiper-button-prev absolute left-4 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm pointer-events-auto transition-all hover:bg-white/20"
          >
            <span className="sr-only">Previous</span>
            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={() => swiperRef.current?.swiper.slideNext()}
            className="swiper-button-next absolute right-4 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm pointer-events-auto transition-all hover:bg-white/20"
          >
            <span className="sr-only">Next</span>
            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}