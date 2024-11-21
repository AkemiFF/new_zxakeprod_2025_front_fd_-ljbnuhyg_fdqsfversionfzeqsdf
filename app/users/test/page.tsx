// index.tsx
'use client';

import Filter from "@/components/Filter";
import SwiperCarousel from "@/components/Swiper";




export default function Home() {


    return (
        <>
            <section className="relative h-[700px]">
                <SwiperCarousel />
                <div className="absolute bottom-0 w-full px-4 md:px-20 z-10">
                    <Filter />
                </div>
            </section>
        </>
    );
}