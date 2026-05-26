import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import SplitText from "../../effect/SplitText";

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default function PricesSection() {
    return (
        <div className="flex flex-col items-center gap-12 mt-20">
            <SplitText
                text={'Explora nuestros precios'}
                className="text-3xl inline-block font-semibold  w-90"
                delay={50}
                duration={1.25}
                ease="power3.out"
                splitType="chars"
                from={{ opacity: 0, y: 40 }}
                to={{ opacity: 1, y: 0 }}
                threshold={0.1}
                rootMargin="-100px"
                textAlign="left"
                showCallback
            />
            <Swiper
                modules={[Navigation, Pagination]}
                spaceBetween={50}
                slidesPerView={1}
                navigation
                pagination={{ clickable: true }}
                className="h-100 w-full mt-20"
            >
                <SwiperSlide>1</SwiperSlide>
                <SwiperSlide>2</SwiperSlide>
                <SwiperSlide>3</SwiperSlide>
            </Swiper>
        </div>
    );
}