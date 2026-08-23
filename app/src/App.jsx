import MainHero from "./component/layout/heroes/MainHero";
import ServiceSection from "./component/layout/section/ServiceSection";
import WhyUsSection from "./component/layout/section/whyUsSection";
import PricesSection from "./component/layout/section/PricesSection";
import CalendarSection from "./component/layout/section/CalendarSection";
import CardNav from "./component/layout/nav/CardNav";
import ContactUsSection from "./component/layout/section/ContactUsSection";
import AboutUs from "./component/layout/section/AboutUs";
import FlamePreloader from "./component/layout/preloader/FlamePreloader";
import EmberField from "./component/effect/EmberField";
import { useState, useRef, useEffect } from "react";
import Footer from "./component/layout/footer/FooterSection";

function App() {
  const navigation = [
    { name: "Servicios", href: "#servicios" },
    { name: "Sobre Nosotros", href: "#sobre-nosotros" },
    { name: "Contacto", href: "#contacto" },
  ];
  const logoRef = useRef(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 10000);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="relative min-h-screen bg-ember-bg text-ember-text">
      {loading && (
        <FlamePreloader
          logoRef={logoRef}
          onFinish={() => setLoading(false)}
        />
      )}

      <EmberField
        density={45}
        className="fixed inset-0 z-0"
        opacity={0.55}
      />

      <div className="sticky top-4 z-9999 w-full flex justify-center">
        <CardNav
          logoRef={logoRef}
          items={navigation.map((item) => ({
            label: item.name,
            bgColor: "#241108",
            textColor: "#ffe8c2",
            links: [
              {
                label: item.name,
                href: item.href,
                ariaLabel: item.name,
              },
            ],
          }))}
          baseColor="rgba(11, 6, 4, 0.78)"
          menuColor="#ffb347"
          buttonBgColor="#e5382c"
          buttonTextColor="#fff"
          ease="power3.out"
        />
      </div>

      <main className="relative z-10">
        <MainHero
          title="Transforma tus ideas en"
          highlightedWord="REALIDAD"
          buttonText="Agendar cita"
          buttonLink="#Agendar"
        />

        <div id="sobre-nosotros" className="scroll-mt-28">
          <AboutUs />
        </div>

        <div id="servicios" className="scroll-mt-28">
          <ServiceSection />
        </div>

        <WhyUsSection />

        <div id="precios">
          <PricesSection />
        </div>

        <CalendarSection />

        <div id="contacto" className="scroll-mt-28">
          <ContactUsSection />
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default App;
