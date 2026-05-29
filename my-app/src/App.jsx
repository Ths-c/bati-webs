import MainHero from "./component/layout/heroes/MainHero";
import ServiceSection from "./component/layout/section/ServiceSection";
import WhyUsSection from "./component/layout/section/whyUsSection";
import PricesSection from "./component/layout/section/PricesSection";
import CalendarSection from "./component/layout/section/CalendarSection";
import CardNav from "./component/layout/nav/CardNav";
import logo from "./assets/logo/download.jpg";
import ContactUsSection from "./component/layout/section/ContactUsSection";

function App() {
  const navigation = [
    { name: "Servicios", href: "#servicios" },
    { name: "Sobre Nosotros", href: "#sobre-nosotros" },
    { name: "Contacto", href: "#contacto" },
  ];

  return (
    <div>
      <div className="sticky top-4 z-9999 w-full flex justify-center">
        <CardNav
          logo={logo}
          logoAlt="Bati Website Logo"
          items={navigation.map((item) => ({
            label: item.name,
            bgColor: "#1f2937",
            textColor: "#ffffff",
            links: [
              {
                label: item.name,
                href: item.href,
                ariaLabel: item.name,
              },
            ],
          }))}
          baseColor="#fff"
          menuColor="#000"
          buttonBgColor="#111"
          buttonTextColor="#fff"
          ease="power3.out"
        />
      </div>

      <MainHero
        title="Transforma tus ideas en"
        highlightedWord="realidad"
        buttonText="Agendar cita"
        buttonLink="#Agendar"
      />
      <div id="servicios">
        <ServiceSection />
      </div>
      <div id="sobre-nosotros">
        <WhyUsSection />
      </div>
      <div id="precios">
        <PricesSection />
      </div>
      <CalendarSection />
      <div id="contacto">
        <ContactUsSection />
      </div>
    </div>
  );
}

export default App;
