import React from 'react';
import SplitText from "../../effect/SplitText";
import MenuIcon from "../../../assets/icons/menuMobile.svg";
import logo from '../../../assets/logo/download.jpg';
import AnimatedList from '../../effect/AnimatedList'
import CardNav from '../nav/CardNav'
import { m } from 'motion/react';
import { title } from 'motion/react-client';


const duration = 1.25;
const text1 = "Transforma tus ideas en";
const delayPerChar = 0.05;

const firstAnimationTime =
  duration + text1.length * delayPerChar;


const navigation = [
  { name: 'Servicios', href: '#' },
  { name: 'Sobre Nosotros', href: '#' },
  { name: 'Contacto', href: '#' },
];

const App = () => {
  const items = [
    {
      label: "About",
      bgColor: "#1B1722",
      textColor: "#fff",
      links: [
        { label: "Company", ariaLabel: "About Company" },
        { label: "Careers", ariaLabel: "About Careers" }
      ]
    },
    {
      label: "Projects",
      bgColor: "#2F293A",
      textColor: "#fff",
      links: [
        { label: "Featured", ariaLabel: "Featured Projects" },
        { label: "Case Studies", ariaLabel: "Project Case Studies" }
      ]
    },
    {
      label: "Contact",
      bgColor: "#2F293A",
      textColor: "#fff",
      links: [
        { label: "Email", ariaLabel: "Email us" },
        { label: "Twitter", ariaLabel: "Twitter" },
        { label: "LinkedIn", ariaLabel: "LinkedIn" }
      ]
    }
  ];

  return (
    <CardNav
      logo={logo}
      logoAlt="Company Logo"
      items={items}
      baseColor="#fff"
      menuColor="#000"
      buttonBgColor="#111"
      buttonTextColor="#fff"
      ease="power3.out"
      theme="light"
    />
  );
};

export default function MainHero({ title, highlightedWord, buttonText, buttonLink }) {

  const [isMobile, setIsMobile] = React.useState(false);

  return (
    <section>
      <div className="mx-auto max-w-7xl flex flex-col items-center gap-12 lg:flex-row">
        <nav className='flex justify-between w-full'>
          <CardNav
            logo={logo}
            logoAlt="Bati Website Logo"
            items={navigation.map((item) => ({
              label: item.name,
              bgColor: '#1f2937',
              textColor: '#ffffff',
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
            theme="light"
          />
        </nav>
        <div className="text-center mt-15">
          <SplitText
            text={title}
            className="text-3xl inline-block font-semibold  w-90"
            delay={50}
            duration={1.25}
            ease="power3.out"
            splitType="chars"
            from={{ opacity: 0, y: 40 }}
            to={{ opacity: 1, y: 0 }}
            threshold={0.1}
            rootMargin="-100px"
            textAlign="left"
            showCallback
          />
          <SplitText
            text={highlightedWord}
            className="text-3xl inline-block font-semibold w-90 text-[#ffa31a]"
            delay={50}
            duration={1.25}
            ease="power3.out"
            splitType="chars"
            from={{ opacity: 0, y: 40 }}
            to={{ opacity: 1, y: 0 }}
            threshold={0.1}
            rootMargin="-100px"
            textAlign="left"
            showCallback
          />

          <div className="ml-10 mt-5 flex items-center gap-x-6">
            <a
              href={buttonLink}
              className="rounded-md px-3.5 py-2.5 text-sm font-semibold shadow-sm focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-indigo-500 hover:text-white hover:bg-[#ffa31a] transition-colors duration-300"
            >
              {buttonText}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}