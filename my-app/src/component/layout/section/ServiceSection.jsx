import React from 'react';
import SpotlightCard from '../cards/SpotlightCard';
import TrueFocus from '../../effect/TrueFocus';

export default function ServiceSection() {
    return (
        <section className="w-full mt-20 py-11 bg-gray-100 flex flex-col items-center gap-8">
            <div className="ml-10 w-fit md:self-center text-center">
                <TrueFocus
                    sentence="CONCENTRATE EN LO IMPORTANTE"
                    manualMode={false}
                    blurAmount={5}
                    borderColor="#ffa31a"
                    animationDuration={0.5}
                    pauseBetweenAnimations={1}
                    textClassName='text-2xl'
                />
                <h3 className="mt-10 text-md font-bold">Confianos a nosotros tu desarrollo online</h3>

            </div>
            <div className="pl-3 lg:pl-6 pr-6 flex flex-col lg:flex-row justify-center gap-8  color-black">
                <SpotlightCard className="sm:hover:scale-110 transition-transform bg-[radial-gradient(circle_at_center,_#ffb84d_0%,_#ffa91f_40%,_#c56a00_100%)] " spotlightColor="rgba(255, 255, 255, 0.45)">
                    <div>
                        <h3 className="text-lg font-semibold mb-2">Sitios web y E-Comerce.</h3>
                        <h4 className="text-gray-800">Diseño y desarrollo de sitios web.</h4>
                        <ul className="list-disc list-inside text-gray-600 mt-2">
                            <li>Diseño web responsivo.</li>
                            <li>Desarrollo de tiendas online.</li>
                            <li>Integracion de reglas UX/UI.</li>
                            <li>Diseño funcional con figma antes del desarrollo del proyecto.</li>
                        </ul>
                    </div>
                </SpotlightCard>
                <SpotlightCard className="sm:hover:scale-110 transition-transform bg-[#ffa31a] bg-[radial-gradient(circle_at_center,_#ffb84d_0%,_#ffa91f_40%,_#c56a00_100%)]" spotlightColor="rgba(255, 255, 255, 0.69)">
                    <div>
                        <h3 className="text-lg font-semibold mb-2">Herramientas para la gestion de su negocio</h3>
                        <h4 className="text-gray-800">Creacion de herramientas a medida para control de stock y/o organizacion.</h4>
                        <ul className="list-disc list-inside text-gray-600 mt-2">
                            <li>Sistemas completos de gestion.</li>
                            <li>Automatizacion y facilitacion de procesos.</li>
                            <li>Integracion de base de datos para el control de stock.</li>
                        </ul>
                    </div>
                </SpotlightCard>
                <SpotlightCard className="sm:hover:scale-110 transition-transform bg-[#ffa31a] bg-[radial-gradient(circle_at_center,_#ffb84d_0%,_#ffa91f_40%,_#c56a00_100%)]" spotlightColor="rgba(255, 255, 255, 0.69)">
                    <div>
                        <h3 className="text-lg font-semibold mb-2">Aplicaciones móbiles</h3>
                        <h4 className="text-gray-800">Creación o migración de aplicaciones al entorno móbil</h4>
                        <ul className="list-disc list-inside text-gray-600 mt-2">
                            <li>Aplicaciones de compra.</li>
                            <li>Expansión de clientes.</li>
                            <li>SOLO ANDROID</li>
                        </ul>
                    </div>
                </SpotlightCard>
            </div>
        </section>
    );
}