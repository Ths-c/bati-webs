import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, EffectFade } from "swiper/modules";
import SplitText from "../../effect/SplitText";
import SpotlightCard from "../cards/SpotlightCard";
import BlurText from "../../effect/BlurText";
import CountUp from "../../effect/CountUp";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

const PLANS = [
  {
    title: "Landing page",
    description:
      "Página pensada para convertir visitantes en clientes potenciales, con un diseño atractivo y funcional que resalta tu propuesta de valor. Diseño funcional con figma antes del desarrollo del proyecto sin cargo.",
    min: 100,
    max: 360,
    prefix: "",
    factors: [
      "Número de secciones.",
      "Formularios.",
      "Cantidad de animaciones y su personalización.",
    ],
  },
  {
    title: "E-commerce en Shopify",
    description:
      "Opción económica de tienda online, desarrollada en Shopify, con diseño customizable.",
    min: 250,
    max: 600,
    prefix: "",
    factors: [
      "Número de productos.",
      "Integraciones de pago.",
      "Cantidad de animaciones y su personalización.",
      "Complejidad técnica del diseño.",
    ],
  },
  {
    title: "E-commerce full-code",
    description:
      "Tu tienda online personalizada, desarrollada en React y con las últimas tecnologías, con funcionalidades avanzadas para una experiencia de compra única.",
    min: 600,
    max: 900,
    prefix: "",
    factors: [
      "Complejidad técnica de la base de datos.",
      "Animaciones complejas.",
      "Integraciones de métodos de pago y/o login con Google.",
      "Roles de usuario y permisos avanzados.",
    ],
  },
  {
    title: "Sistema custom completo",
    description:
      "Herramienta digital con el objetivo de optimizar y automatizar procesos internos de tu negocio, como el control de stock, la gestión de clientes/empleados, etc. Plenamente adaptado a sus necesidades.",
    min: 1400,
    max: null,
    prefix: "~",
    factors: [
      "Integración y complejidad de APIs requeridas.",
      "Roles de usuario y permisos avanzados.",
      "Cantidad de funcionalidades.",
    ],
  },
];

export default function PricesSection() {
  const [activeSlide, setActiveSlide] = React.useState(0);

  return (
    <div className="flex flex-col items-center gap-12 my-36 px-4">
      <SplitText
        text="Explora nuestros precios"
        tag="h2"
        className="text-fire text-3xl md:text-5xl inline-block font-extrabold uppercase tracking-tight"
        delay={35}
        duration={1}
        ease="power3.out"
        splitType="chars"
        from={{ opacity: 0, y: 50, rotateX: -60 }}
        to={{ opacity: 1, y: 0, rotateX: 0 }}
        threshold={0.1}
        rootMargin="-100px"
        textAlign="center"
      />

      <Swiper
        modules={[Navigation, Pagination, EffectFade]}
        slidesPerView={1}
        loop
        navigation
        pagination={{ clickable: true }}
        className="w-full !py-14 lg:h-[640px] sm:h-auto"
        style={{
          "--swiper-navigation-color": "#ffb347",
          "--swiper-pagination-color": "#ff6b1a",
          "--swiper-pagination-bullet-inactive-color": "rgba(255,179,71,0.25)",
          "--swiper-pagination-bullet-inactive-opacity": "1",
        }}
        onSlideChange={(swiper) => {
          setActiveSlide(swiper.realIndex);
        }}
      >
        {PLANS.map((plan) => (
          <SwiperSlide key={plan.title}>
            <div className="flex flex-col items-center gap-8 w-full pb-10">
              <BlurText
                key={`title-${plan.title}-${activeSlide}`}
                text={plan.title}
                delay={200}
                animateBy="words"
                direction="top"
                className="text-3xl md:text-4xl mt-8 font-bold text-flame-pale"
              />
              <SpotlightCard className="card-ember rounded-3xl w-[88vw] max-w-md lg:max-w-[70vw]">
                <div className="flex flex-col items-start gap-4">
                  <h4 className="text-stone-300/90 text-sm leading-relaxed">
                    {plan.description}
                  </h4>

                  <div className="w-full py-6 flex items-center justify-center gap-1 text-4xl md:text-5xl rounded-2xl border-y border-flame-orange/30 bg-[radial-gradient(80%_120%_at_50%_50%,rgba(255,107,26,0.12),transparent)]">
                    {plan.prefix && (
                      <span className="text-2xl mr-2 text-flame-amber">
                        {plan.prefix}
                      </span>
                    )}
                    <CountUp
                      key={`min-${plan.title}-${activeSlide}`}
                      from={0}
                      to={plan.min}
                      separator=","
                      direction="up"
                      duration={1}
                      className="count-up-text text-fire font-extrabold"
                      delay={0}
                    />
                    {plan.max !== null && (
                      <>
                        <span className="text-2xl text-ember-muted">-</span>
                        <CountUp
                          key={`max-${plan.title}-${activeSlide}`}
                          from={0}
                          to={plan.max}
                          separator=","
                          direction="up"
                          duration={1}
                          className="count-up-text text-fire font-extrabold"
                          delay={0}
                        />
                      </>
                    )}
                    <span className="text-xl text-ember-muted ml-3">USD</span>
                  </div>

                  <div className="mt-2 text-sm text-stone-300/85">
                    <p className="mb-2.5 font-semibold text-flame-pale">
                      Los precios pueden variar dependiendo de:
                    </p>
                    <ul className="space-y-2">
                      {plan.factors.map((factor) => (
                        <li key={factor} className="flex gap-3">
                          <span className="flame-bullet" aria-hidden="true" />
                          <span>{factor}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <h4 className="text-stone-400 italic text-sm">
                    * Todo se define en una reunión para ajustar el precio
                    final.
                  </h4>
                </div>
              </SpotlightCard>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <FooterNote />
    </div>
  );
}

function FooterNote() {
  return (
    <h4 className="text-center italic text-base md:text-lg max-w-3xl text-ember-muted">
      * En el caso de llegar a necesitar un servicio distinto a los
      anteriormente propuestos, póngase en contacto con nosotros para charlar
      los precios y la disponibilidad.
    </h4>
  );
}
