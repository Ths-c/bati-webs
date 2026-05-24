import React, { useState } from 'react'
import MainHero from "./component/layout/heroes/MainHero";
import ServiceSectionm from './component/layout/section/ServiceSection'


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
    </div>
  )
}

export default App
