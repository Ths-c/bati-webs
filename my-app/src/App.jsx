import React, { useState } from 'react'
import MainHero from "./component/layout/heroes/MainHero";


function App() {

  return (
    <div>
      <MainHero
        title="Transforma tus ideas en"
        highlightedWord="realidad"
        buttonText="Agendar cita"
        buttonLink="#"
      />
    </div>
  )
}

export default App
