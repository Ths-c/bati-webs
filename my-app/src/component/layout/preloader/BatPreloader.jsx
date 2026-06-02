import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Bat from "./Bat";

export default function BatPreloader({ logoRef, onFinish }) {
  const [flying, setFlying] = useState(true);
  const overlayRef = useRef(null);
  const batRef = useRef(null);

  useEffect(() => {
    if (!batRef.current) return;

    const flight = gsap.timeline({ repeat: -1 });

    flight
      .to(batRef.current, {
        x: 120,
        y: -60,
        duration: 1,
        ease: "sine.inOut",
      })
      .to(batRef.current, {
        x: -100,
        y: 40,
        duration: 1,
        ease: "sine.inOut",
      });

    const timer = setTimeout(() => {
      flight.kill();

      if (!logoRef?.current) {
        onFinish?.();
        return;
      }

      setFlying(false);

      const logoRect = logoRef.current.getBoundingClientRect();

      const batRect = batRef.current.getBoundingClientRect();

      const dx =
        logoRect.left + logoRect.width / 2 - (batRect.left + batRect.width / 2);

      const dy =
        logoRect.top + logoRect.height / 2 - (batRect.top + batRect.height / 2);

      gsap.to(batRef.current, {
        x: `+=${dx}`,
        y: `+=${dy}`,
        scale: 0.35,
        duration: 1.4,
        ease: "power3.inOut",
      });
    }, 2500);

    return () => {
      clearTimeout(timer);
      flight.kill();
    };
  }, [logoRef, onFinish]);

  return (
    <div
      ref={overlayRef}
      className="
        fixed
        inset-0
        bg-black
        z-[99999]
        overflow-hidden
      "
    >
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
        <Bat flying={flying} />
      </div>
    </div>
  );
}
