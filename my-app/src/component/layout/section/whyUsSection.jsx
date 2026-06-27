import React from "react";
import Carousel from '../cards/Carrousel';
import SplitText from "../../effect/SplitText";

export default function whyUsSection({ title = "¿Por qué elegirnos?" }) {
    return (
        <div className="flex flex-col items-center gap-12 mt-20">
            <SplitText
                text={title}
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
            <div className="h-fit">
                <Carousel
                    baseWidth='85vw lg:55vw'
                    autoplay={false}
                    autoplayDelay={3000}
                    pauseOnHover={false}
                    loop
                    round={false}
                />
            </div>
        </div>
    )
}