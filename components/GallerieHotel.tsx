'use client'

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Image from "next/image"
import { useState } from "react"

interface GallerieHotelProps {
  images: { image: string }[]
}

export default function GallerieHotel({ images }: GallerieHotelProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [allPhotoVisible, setAllPhotoVisible] = useState(false)
  const [fullScreenVisible, setFullScreenVisible] = useState(false)

  const nombreImageNonAffiche = () => {
    return images.length - 5
  }

  const nextImage = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % images.length)
  }

  const prevImage = () => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length)
  }

  return (
    <>
      <div className="grid grid-cols-4 gap-2">
        <div className="col-span-2 row-span-2">
          <Image
            src={`${UrlConfig}${images[0].image}`}
            alt="Main image"
            width={500}
            height={500}
            className="w-full h-full object-cover cursor-pointer"
            onClick={() => {
              setActiveIndex(0)
              setFullScreenVisible(true)
            }}
          />
        </div>
        {images.slice(1, 4).map((image, index) => (
          <div key={index}>
            <Image
              src={`${UrlConfig}${image.image}`}
              alt={`Image ${index + 2}`}
              width={250}
              height={250}
              className="w-full h-full object-cover cursor-pointer"
              onClick={() => {
                setActiveIndex(index + 1)
                setFullScreenVisible(true)
              }}
            />
          </div>
        ))}
        {images.length > 4 && (
          <div className="relative">
            <Image
              src={`${UrlConfig}${images[4].image}`}
              alt="More images"
              width={250}
              height={250}
              className="w-full h-full object-cover cursor-pointer"
              onClick={() => setAllPhotoVisible(true)}
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <span className="text-white text-lg font-bold">
                +{nombreImageNonAffiche()} photo{nombreImageNonAffiche() < 1 ? "" : "s"}
              </span>
            </div>
          </div>
        )}
      </div>

      <Dialog open={allPhotoVisible} onOpenChange={setAllPhotoVisible}>
        <DialogContent className="max-w-7xl">
          <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {images.map((image, index) => (
              <Image
                key={index}
                src={`${UrlConfig}${image.image}`}
                alt={`Image ${index + 1}`}
                width={200}
                height={200}
                className="w-full h-full object-cover cursor-pointer"
                onClick={() => {
                  setActiveIndex(index)
                  setAllPhotoVisible(false)
                  setFullScreenVisible(true)
                }}
              />
            ))}
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={fullScreenVisible} onOpenChange={setFullScreenVisible}>
        <DialogContent className="max-w-7xl">
          <div className="relative">
            <Image
              src={`${UrlConfig}${images[activeIndex].image}`}
              alt={`Full screen image ${activeIndex + 1}`}
              width={1000}
              height={1000}
              className="w-full h-full object-contain"
            />
            <Button
              variant="outline"
              size="icon"
              className="absolute top-1/2 left-4 transform -translate-y-1/2"
              onClick={prevImage}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="absolute top-1/2 right-4 transform -translate-y-1/2"
              onClick={nextImage}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

