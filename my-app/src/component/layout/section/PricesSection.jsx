import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Parallax, EffectFade } from "swiper/modules";
import SplitText from "../../effect/SplitText";
import SpotlightCard from "../cards/SpotlightCard";
import BlurText from "../../effect/BlurText";
import CountUp from "../../effect/CountUp";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

export default function PricesSection() {
  const [activeSlide, setActiveSlide] = React.useState(0);
  return (
    <div className="flex flex-col items-center gap-12 my-40">
      <SplitText
        text={"Explora nuestros precios"}
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
        modules={[Navigation, Pagination, Parallax, EffectFade]}
        slidesPerView={1}
        loop
        navigation
        pagination={{ clickable: true }}
        className="w-full h-full lg:h-[600px] sm:h-180"
        onSlideChange={(swiper) => {
          setActiveSlide(swiper.realIndex);
        }}
      >
        <SwiperSlide>
          <div className="flex flex-col items-center gap-8 w-full">
            <BlurText
              key={`title-${activeSlide}`}
              text="Landing page"
              delay={200}
              animateBy="words"
              direction="top"
              className="text-4xl mt-8"
            />
            <SpotlightCard
              className="sm:hover:scale-110 transition-transform w-80 lg:w-[70vw] bg-black"
              
            >
              <div className="flex flex-col items-start gap-4">
                <h4 className="text-gray-400 text-sm">
                  Pagina pensada para convertir visitantes en clientes
                  potenciales, con un diseño atractivo y funcional que resalta
                  tu propuesta de valor. Diseño funcional con figma antes del
                  desarrollo del proyecto sin cargo.
                </h4>
                <div className="w-full h-20 flex items-center justify-center text-4xl rounded-lg bg-white">
                  <CountUp
                    key={`minPrice-${activeSlide}`}
                    from={0}
                    to={100}
                    separator=","
                    direction="up"
                    duration={1}
                    className="count-up-text"
                    delay={0}
                  />
                  <span className="text-2xl">-</span>
                  <CountUp
                    key={`maxPrice-${activeSlide}`}
                    from={0}
                    to={360}
                    separator=","
                    direction="up"
                    duration={1}
                    className="count-up-text"
                    delay={0}
                  />
                  <span className="text-2xl text-gray-400 ml-2">USD</span>
                </div>
                <ul className="list-disc list-inside text-gray-300 mt-2">
                  <p className="mb-2">
                    Los precios pueden variar dependiendo de:
                  </p>
                  <li>Numero de secciones.</li>
                  <li>Formularios.</li>
                  <li>Cantidad de animaciones y su customizacion.</li>
                </ul>
                <h4 className="text-gray-400 italic text-sm">
                  * Todo se define en una reunión para ajustar el precio final.
                </h4>
              </div>
            </SpotlightCard>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="flex flex-col items-center gap-8 w-full">
            <BlurText
              key={`title-${activeSlide}`}
              text="E-commerce en Shopify"
              delay={200}
              animateBy="words"
              direction="top"
              className="text-4xl text-center w-70 mt-8"
            />
            <SpotlightCard
              className="sm:hover:scale-110 transition-transform w-80 lg:w-[70vw] bg-black"
              
            >
              <div className="flex flex-col items-start gap-4">
                <h4 className="text-gray-400 text-sm">
                  Opcion economica de tienda online, desarrollada en Shopify,
                  con diseño customizable.
                </h4>
                <div className="w-full h-20 flex items-center justify-center text-4xl rounded-lg bg-white">
                  <CountUp
                    key={`minPrice-${activeSlide}`}
                    from={0}
                    to={250}
                    separator=","
                    direction="up"
                    duration={1}
                    className="count-up-text"
                    delay={0}
                  />
                  <span className="text-2xl">-</span>
                  <CountUp
                    key={`maxPrice-${activeSlide}`}
                    from={0}
                    to={600}
                    separator=","
                    direction="up"
                    duration={1}
                    className="count-up-text"
                    delay={0}
                  />
                  <span className="text-2xl text-gray-400 ml-2">USD</span>
                </div>
                <ul className="list-disc list-inside text-gray-300 mt-2">
                  <p className="mb-2">
                    Los precios pueden variar dependiendo de:
                  </p>
                  <li>Número de productos.</li>
                  <li>Integraciones de pago.</li>
                  <li>Cantidad de animaciones y su customizacion.</li>
                  <li>Complejidad tecnica del diseño.</li>
                </ul>
                <h4 className="text-gray-400 italic text-sm">
                  * Todo se define en una reunión para ajustar el precio final.
                </h4>
              </div>
            </SpotlightCard>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="flex flex-col items-center gap-8 w-full">
            <BlurText
              key={`title-${activeSlide}`}
              text="E-commerce full-code"
              delay={200}
              animateBy="words"
              direction="top"
              className="text-4xl text-center w-90 mt-8"
            />
            <SpotlightCard
              className="sm:hover:scale-110 transition-transform w-80 lg:w-[70vw] bg-black"
              
            >
              <div className="flex flex-col items-start gap-4">
                <h4 className="text-gray-400 text-sm">
                  Tu tienda online personalizada, desarrollada en React y con
                  las ultimas tecnologias, con funcionalidades avanzadas para
                  una experiencia de compra única.
                </h4>
                <div className="w-full h-20 flex items-center justify-center text-4xl rounded-lg bg-white">
                  <CountUp
                    key={`minPrice-${activeSlide}`}
                    from={0}
                    to={600}
                    separator=","
                    direction="up"
                    duration={1}
                    className="count-up-text"
                    delay={0}
                  />
                  <span className="text-2xl">-</span>
                  <CountUp
                    key={`maxPrice-${activeSlide}`}
                    from={0}
                    to={900}
                    separator=","
                    direction="up"
                    duration={1}
                    className="count-up-text"
                    delay={0}
                  />
                  <span className="text-2xl text-gray-400 ml-2">USD</span>
                </div>
                <ul className="list-disc list-inside text-gray-300 mt-2">
                  <p className="mb-2">
                    Los precios pueden variar dependiendo de:
                  </p>
                  <li>Complejidad tecnica de la base de datos.</li>
                  <li>Animaciones complejas.</li>
                  <li>
                    Integraciones de metodos de pago y/o login con google.
                  </li>
                  <li>Roles de usuario y permisos avanzados.</li>
                </ul>
                <h4 className="text-gray-400 italic text-sm">
                  * Todo se define en una reunión para ajustar el precio final.
                </h4>
              </div>
            </SpotlightCard>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="flex flex-col items-center gap-8 w-full">
            <BlurText
              key={`title-${activeSlide}`}
              text="Sistema custom completo"
              delay={200}
              animateBy="words"
              direction="top"
              className="text-4xl text-center w-70 mt-8"
            />
            <SpotlightCard
              className="sm:hover:scale-110 transition-transform w-80 lg:w-[70vw] bg-black"
              
            >
              <div className="flex flex-col items-start gap-4">
                <h4 className="text-gray-400 text-sm">
                  Herramienta digital con el objetivo de optimizar y automatizar
                  procesos internos de tu negocio, como el control de stock, la
                  gestion de clientes/empleados, etc. Plenamente adaptado a sus
                  necesidades.
                </h4>
                <div className="w-full h-20 flex items-center justify-center text-4xl rounded-lg bg-white">
                  <span className="text-2xl">~</span>
                  <CountUp
                    key={`minPrice-${activeSlide}`}
                    from={0}
                    to={1400}
                    separator=","
                    direction="up"
                    duration={1}
                    className="count-up-text"
                    delay={0}
                  />
                  <span className="text-2xl text-gray-400 ml-2">USD</span>
                </div>
                <ul className="list-disc list-inside text-gray-300 mt-2">
                  <p className="mb-2">
                    Los precios pueden variar dependiendo de:
                  </p>
                  <li>Integracion y complejidad de APIs requeridas.</li>
                  <li>Roles de usuario y permisos avanzados.</li>
                  <li>Cantidad de funcionalidades.</li>
                </ul>
                <h4 className="text-gray-400 italic text-sm">
                  * Todo se define en una reunión para ajustar el precio final.
                </h4>
              </div>
            </SpotlightCard>
          </div>
        </SwiperSlide>
      </Swiper>
      <h4 className="text-gray-700 text-center italic text-lg w-90 lg:w-full">
        * En el caso de llegar a necesitar un servicio distinto a los anteriormente propuestos, pongase en contacto con nosotros para charlas los precios y la disponibilidad!!
      </h4>
    </div>
  );
}
