import React from 'react';
import SpotlightCard from '../cards/SpotlightCard';
import TrueFocus from '../../effect/TrueFocus';

export default function ServiceSection() {
    return (
        <section className="w-full mt-20 py-11 bg-gray-100 flex flex-col items-center gap-8">
            <div className="ml-10 w-full">
                <TrueFocus
                    sentence="CONCENTRATE EN LO IMPORTANTE"
                    manualMode={false}
                    blurAmount={5}
                    borderColor="#ffa31a"
                    animationDuration={0.5}
                    pauseBetweenAnimations={1}
                    textClassName='text-2xl'
                />

            </div>
            <div className="pl-3 pr-6 flex flex-col lg:flex-row justify-center gap-8">
                <h3 className="mt-10 text-md font-bold">Confianos a nosotros tu desarrollo online</h3>
                <SpotlightCard className="sm:hover:scale-110 transition-transform custom-spotlight-card" spotlightColor="rgba(255, 255, 255, 0.45)">
                    <div>
                        <h3 className="text-lg text-white font-semibold mb-2">Sitios web y E-Comerce.</h3>
                        <h4 className="text-gray-400">Diseño y desarrollo de sitios web.</h4>
                        <ul className="list-disc list-inside text-gray-300 mt-2">
                            <li>Diseño web responsivo.</li>
                            <li>Desarrollo de tiendas online.</li>
                            <li>Integracion de reglas UX/UI.</li>
                            <li>Diseño funcional con figma antes del desarrollo del proyecto.</li>
                        </ul>
                    </div>
                </SpotlightCard>
                <SpotlightCard className="sm:hover:scale-110 transition-transform custom-spotlight-card" spotlightColor="rgba(255, 255, 255, 0.45)">
                    <div>
                        <h3 className="text-lg text-white font-semibold mb-2">Herramientas para la gestion de su negocio</h3>
                        <h4 className="text-gray-400">Creacion de herramientas a medida para control de stock y/o organizacion.</h4>
                        <ul className="list-disc list-inside text-gray-300 mt-2">
                            <li>Sistemas completos de gestion.</li>
                            <li>Automatizacion y facilitacion de procesos.</li>
                            <li>Integracion de base de datos para el control de stock.</li>
                        </ul>
                    </div>
                </SpotlightCard>
            </div>
        </section>
    );
}