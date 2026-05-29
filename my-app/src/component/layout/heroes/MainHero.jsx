import React from 'react';
import SplitText from "../../effect/SplitText";
import MenuIcon from "../../../assets/icons/menuMobile.svg";
import AnimatedList from '../../effect/AnimatedList'
import { m } from 'motion/react';
import { title } from 'motion/react-client';


const duration = 1.25;
const text1 = "Transforma tus ideas en";
const delayPerChar = 0.05;

const firstAnimationTime =
  duration + text1.length * delayPerChar;



export default function MainHero({ title, highlightedWord, buttonText, buttonLink }) {

  const [isMobile, setIsMobile] = React.useState(false);

  return (
    <section>
      <div className="mx-auto max-w-7xl flex flex-col items-center gap-12 lg:flex-row">
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