import { FiMonitor, FiTrendingUp, FiSmartphone } from "react-icons/fi";
import SpotlightCard from "../cards/SpotlightCard";
import TrueFocus from "../../effect/TrueFocus";

const SERVICES = [
  {
    icon: <FiMonitor className="h-7 w-7" aria-hidden="true" />,
    title: "Sitios web y E-Commerce.",
    subtitle: "Diseño y desarrollo de sitios web.",
    items: [
      "Diseño web responsivo.",
      "Desarrollo de tiendas online.",
      "Integración de reglas UX/UI.",
      "Diseño funcional con figma antes del desarrollo del proyecto.",
    ],
  },
  {
    icon: <FiTrendingUp className="h-7 w-7" aria-hidden="true" />,
    title: "Herramientas para la gestión de su negocio",
    subtitle:
      "Creación de herramientas a medida para control de stock y/o organización.",
    items: [
      "Sistemas completos de gestión.",
      "Automatización y facilitación de procesos.",
      "Integración de base de datos para el control de stock.",
    ],
  },
  {
    icon: <FiSmartphone className="h-7 w-7" aria-hidden="true" />,
    title: "Aplicaciones móviles",
    subtitle: "Creación o migración de aplicaciones al entorno móvil",
    items: [
      "Migración de aplicaciones para lograr un mayor rango de clientela.",
      "SOLO ANDROID",
    ],
  },
];

export default function ServiceSection() {
  return (
    <section className="relative w-full mt-28 py-16 section-glow">
      <div className="flex flex-col items-center gap-10 px-4">
        <div className="w-fit text-center">
          <TrueFocus
            sentence="CONCÉNTRATE EN LO IMPORTANTE"
            manualMode={false}
            blurAmount={5}
            borderColor="#ff6b1a"
            glowColor="rgba(255, 107, 26, 0.6)"
            animationDuration={0.5}
            pauseBetweenAnimations={1}
            textClassName="text-2xl md:text-4xl text-flame-pale"
          />
          <h3 className="mt-8 text-lg md:text-xl font-semibold text-ember-muted tracking-wide">
            Encomiéndanos tu desarrollo online
          </h3>
        </div>

        <div className="flex flex-col lg:flex-row justify-center gap-7 max-w-6xl w-full">
          {SERVICES.map((service, i) => (
            <SpotlightCard
              key={service.title}
              className="card-ember rounded-3xl flex-1 group"
              spotlightColor="rgba(255, 130, 40, 0.22)"
            >
              <div style={{ transitionDelay: `${i * 60}ms` }}>
                <div className="mb-5 inline-flex items-center justify-center h-14 w-14 rounded-2xl bg-gradient-to-br from-flame-red to-flame-orange text-white shadow-[0_0_25px_-5px_rgba(255,107,26,0.7)] transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6 animate-flicker">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold mb-2 text-flame-pale">
                  {service.title}
                </h3>
                <h4 className="text-sm text-ember-muted">{service.subtitle}</h4>
                <ul className="mt-4 space-y-2.5 text-sm text-stone-300/85">
                  {service.items.map((item) => (
                    <li key={item} className="flex gap-3">
                      <span className="flame-bullet" aria-hidden="true" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </SpotlightCard>
          ))}
        </div>
      </div>
    </section>
  );
}
