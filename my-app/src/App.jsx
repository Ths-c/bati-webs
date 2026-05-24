import React, { useState } from 'react'
import MainHero from "./component/layout/heroes/MainHero";
import ServiceSectionm from './component/layout/section/ServiceSection'
import WhyUsSection from './component/layout/section/whyUsSection';


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
    </div>
  )
}

export default App
