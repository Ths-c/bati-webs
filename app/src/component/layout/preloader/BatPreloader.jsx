import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Bat from "./Bat";
import BlurText from "../../effect/BlurText";

export default function BatPreloader({ logoRef, onFinish }) {
  const overlayRef = useRef(null);
  const batRef = useRef(null);

  useEffect(() => {
    const isMobile = window.innerWidth < 768;

    const flightDistance = isMobile ? 120 : 220;

    if (!batRef.current) return;

    const flight = gsap.timeline({ repeat: -1 });

    const logoRect = logoRef.current.getBoundingClientRect();

    const batRect = batRef.current.getBoundingClientRect();

    const dx =
      logoRect.left + logoRect.width / 2 - (batRect.left + batRect.width / 2);

    const dy =
      logoRect.top + logoRect.height / 2 - (batRect.top + batRect.height / 2);

    flight
      .to(batRef.current, {
        x: flightDistance,
        y: -120,
        duration: 1.5,
        ease: "sine.inOut",
      })
      .to(batRef.current, {
        x: -flightDistance,
        y: -120,
        duration: 1.5,
        ease: "sine.inOut",
      })
      .to(batRef.current, {
        x: 0,
        y: 0,
        duration: 2,
        ease: "sine.inOut",
      })
      .to(batRef.current, {
        scale: 10,
        duration: 2,
        ease: "sine.inOut",
      })
      .to(batRef.current, {
        x: `+=${dx}`,
        y: `+=${dy}`,
        scale: 0.5,
        duration: 1.4,
        ease: "power3.inOut",
      })
      .to(
        overlayRef.current,
        {
          opacity: 0,
          duration: 0.5,
          onComplete: () => {
            onFinish?.();
          },
        },
        "-=0.2",
      );

    return () => {
      flight.kill();
    };
  }, [logoRef, onFinish]);

  return (
    <div
      ref={overlayRef}
      className="
        fixed
        inset-0
        bg-white
        z-99999
        overflow-hidden
      "
    >
      <BlurText
        text="BATI-WEBS"
        delay={2000}
        className="text-4xl font-bold text-center absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
      />
      <div
        ref={batRef}
        className="
          absolute
          left-1/2
          top-1/2
          -translate-x-1/2
          -translate-y-1/2
        "
      >
        <Bat />
      </div>
    </div>
  );
}
