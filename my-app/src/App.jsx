
import MainHero from "./component/layout/heroes/MainHero";
import ServiceSectionm from './component/layout/section/ServiceSection'
import WhyUsSection from './component/layout/section/whyUsSection';
import PricesSection from './component/layout/section/PricesSection';


function App() {

  return (
    <div>
      <MainHero
        title="Transforma tus ideas en"
        highlightedWord="realidad"
        buttonText="Agendar cita"
        buttonLink="#"
      />
      <ServiceSectionm />
      <WhyUsSection />
      <PricesSection />
    </div>
  )
}

export default App
