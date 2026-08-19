import { useEffect, useRef } from "react";
import gsap from "gsap";
import FlameLogo from "./FlameLogo";
import BlurText from "../../effect/BlurText";

export default function FlamePreloader({ logoRef, onFinish }) {
  const overlayRef = useRef(null);
  const flameRef = useRef(null);

  useEffect(() => {
    const isMobile = window.innerWidth < 768;

    const flightDistance = isMobile ? 120 : 220;

    if (!flameRef.current) return;

    const flight = gsap.timeline({ repeat: -1 });

    const logoRect = logoRef.current.getBoundingClientRect();

    const flameRect = flameRef.current.getBoundingClientRect();

    const dx =
      logoRect.left + logoRect.width / 2 - (flameRect.left + flameRect.width / 2);

    const dy =
      logoRect.top + logoRect.height / 2 - (flameRect.top + flameRect.height / 2);

    flight
      .to(flameRef.current, {
        x: flightDistance,
        y: -120,
        duration: 1.5,
        ease: "sine.inOut",
      })
      .to(flameRef.current, {
        x: -flightDistance,
        y: -120,
        duration: 1.5,
        ease: "sine.inOut",
      })
      .to(flameRef.current, {
        x: 0,
        y: 0,
        duration: 2,
        ease: "sine.inOut",
      })
      .to(flameRef.current, {
        scale: 10,
        duration: 2,
        ease: "sine.inOut",
      })
      .to(flameRef.current, {
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
        text="IGNITEX"
        delay={2000}
        className="text-4xl font-bold text-center absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
      />
      <div
        ref={flameRef}
        className="
          absolute
          left-1/2
          top-1/2
          -translate-x-1/2
          -translate-y-1/2
        "
      >
        <FlameLogo />
      </div>
    </div>
  );
}