import { useEffect, useRef } from "react";
import gsap from "gsap";
import FlameLogo from "./FlameLogo";
import BlurText from "../../effect/BlurText";
import EmberField from "../../effect/EmberField";

export default function FlamePreloader({ logoRef, onFinish }) {
  const overlayRef = useRef(null);
  const flameRef = useRef(null);
  const ringRef = useRef(null);

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

    const ringSpin = gsap.to(ringRef.current, {
      rotate: 360,
      duration: 6,
      ease: "none",
      repeat: -1,
    });

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
            ringSpin.kill();
            onFinish?.();
          },
        },
        "-=0.2",
      );

    return () => {
      flight.kill();
      ringSpin.kill();
    };
  }, [logoRef, onFinish]);

  return (
    <div
      ref={overlayRef}
      className="
        fixed inset-0 z-99999 overflow-hidden
        bg-ember-bg
      "
    >
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 45% at 50% 55%, rgba(229,56,44,0.18), transparent 70%)",
        }}
      />
      <EmberField density={40} className="absolute inset-0" opacity={0.7} />

      <BlurText
        text="IGNITEX"
        delay={2000}
        className="text-4xl md:text-5xl font-black tracking-[0.35em] text-center absolute left-1/2 top-[62%] -translate-x-1/2 -translate-y-1/2 text-flame-pale"
      />

      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <div
          ref={ringRef}
          aria-hidden="true"
          className="absolute left-1/2 top-1/2 h-44 w-44 -ml-22 -mt-22 rounded-full"
          style={{
            border: "1px dashed rgba(255,107,26,0.45)",
            boxShadow: "inset 0 0 40px rgba(229,56,44,0.25)",
          }}
        />
        <div
          ref={flameRef}
          className="relative drop-shadow-[0_0_25px_rgba(255,107,26,0.55)]"
        >
          <FlameLogo />
        </div>
      </div>
    </div>
  );
}
