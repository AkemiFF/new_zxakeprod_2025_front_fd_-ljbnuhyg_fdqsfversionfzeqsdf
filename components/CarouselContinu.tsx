'use client'

import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image'

const CarouselContinu = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const carouselRef = useRef<HTMLDivElement>(null)

  const images = [
    '/images/artisanat/sculptur-metal.png',
    '/images/artisanat/sculptur-metal.png',
    '/images/artisanat/sculptur-metal.png',
    '/images/artisanat/sculptur-metal.png',
    '/images/artisanat/tapisserie.png',
    '/images/artisanat/bijou.png',
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      if (carouselRef.current) {
        const maxScroll = carouselRef.current.scrollWidth - carouselRef.current.clientWidth
        const newIndex = (currentIndex + 1) % images.length
        const scrollPosition = (maxScroll * newIndex) / (images.length - 1)
        carouselRef.current.scrollTo({
          left: scrollPosition,
          behavior: 'smooth',
        })
        setCurrentIndex(newIndex)
      }
    }, 4000)

    return () => clearInterval(interval)
  }, [currentIndex, images.length])

  return (
    <div className="relative w-full overflow-hidden">
      <div
        ref={carouselRef}
        className="flex transition-transform duration-500 ease-in-out space-x-4 overflow-x-hidden"
      >
        {images.map((src, index) => (
          <div key={index} className="flex-shrink-0 w-1/5">
            <Image
              src={src}
              alt={`Image ${index + 1}`}
              width={200}
              height={200}
              className="object-cover w-full h-[30rem] filter brightness-80 contrast-110 saturate-80 blur-sm rounded-lg"
            />
          </div>
        ))}
      </div>
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {images.map((_, index) => (
          <div
            key={index}
            className={`w-2 h-2 rounded-full ${
              index === currentIndex ? 'bg-white' : 'bg-gray-400'
            }`}
          ></div>
        ))}
      </div>
    </div>
  )
}

export default CarouselContinu
