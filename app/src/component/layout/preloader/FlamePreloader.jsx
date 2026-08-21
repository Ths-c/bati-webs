import { useEffect, useRef } from "react";
import gsap from "gsap";
import FlameLogo from "./FlameLogo";
import EmberField from "../../effect/EmberField";

const BRAND = "IGNITEX".split("");

export default function FlamePreloader({ logoRef, onFinish }) {
  const rootRef = useRef(null);
  const dotRef = useRef(null);
  const ringARef = useRef(null);
  const ringBRef = useRef(null);
  const flameWrapRef = useRef(null);
  const letterRefs = useRef([]);
  const fuseFillRef = useRef(null);
  const fuseHeadRef = useRef(null);
  const flashRef = useRef(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduced) {
      const t = setTimeout(() => onFinish?.(), 350);
      return () => clearTimeout(t);
    }

    const ctx = gsap.context(() => {
      const letters = letterRefs.current.filter(Boolean);

      gsap.set(dotRef.current, { scale: 0, opacity: 0 });
      gsap.set(flameWrapRef.current, { scale: 0.4, opacity: 0 });
      gsap.set(letters, { opacity: 0, y: 20, filter: "blur(10px)" });
      gsap.set(fuseFillRef.current, { scaleX: 0, transformOrigin: "left center" });
      gsap.set(flashRef.current, { opacity: 0 });

      const tl = gsap.timeline({
        defaults: { ease: "power2.out" },
        onComplete: () => onFinish?.(),
      });

      tl.to(dotRef.current, { scale: 1, opacity: 1, duration: 0.35 })
        // brasas del logo latiendo en anillos
        .to(
          ringARef.current,
          { scale: 1.7, opacity: 0, duration: 1.5, repeat: -1, ease: "none" },
          0.15,
        )
        .to(
          ringBRef.current,
          { scale: 1.7, opacity: 0, duration: 1.5, repeat: -1, ease: "none" },
          0.55,
        )
        // la chispa se convierte en llama
        .to(dotRef.current, { scale: 6, opacity: 0, duration: 0.5 }, 0.45)
        .to(flameWrapRef.current, { scale: 1, opacity: 1, duration: 0.55 }, 0.5)
        .to(
          flameWrapRef.current,
          {
            keyframes: [
              { rotate: -3, yPercent: -4, duration: 0.09 },
              { rotate: 2.5, yPercent: 2, duration: 0.11 },
              { rotate: -1.5, yPercent: 0, duration: 0.13 },
              { rotate: 0, duration: 0.12 },
            ],
          },
          0.5,
        )
        // letras encendiéndose una a una
        .to(
          letters,
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 0.45,
            stagger: 0.08,
            ease: "power3.out",
          },
          0.95,
        )
        // mecha encendida
        .to(fuseFillRef.current, { scaleX: 1, duration: 1.15, ease: "power1.inOut" }, 1.15)
        .to(
          fuseHeadRef.current,
          {
            x: () => fuseFillRef.current.offsetWidth,
            duration: 1.15,
            ease: "power1.inOut",
          },
          1.15,
        )
        // fogonazo de ignición
        .to(flashRef.current, { opacity: 0.9, duration: 0.12 }, 2.42)
        .to(flashRef.current, { opacity: 0, duration: 0.45 }, 2.54)
        .to(flameWrapRef.current, { scale: 1.35, duration: 0.3 }, 2.42);

      // vuelo hacia el logo de la barra de navegación
      tl.add(() => {
        const target = logoRef?.current;
        const flameEl = flameWrapRef.current;
        if (!target || !flameEl) return;

        const tr = target.getBoundingClientRect();
        const fr = flameEl.getBoundingClientRect();
        const dx = tr.left + tr.width / 2 - (fr.left + fr.width / 2);
        const dy = tr.top + tr.height / 2 - (fr.top + fr.height / 2);

        gsap.to(flameEl, {
          x: dx,
          y: dy,
          scale: 0.5,
          duration: 0.8,
          delay: 0.15,
          ease: "power3.inOut",
        });
      }, 2.6);

      tl.to(
        [letterRefs.current, ringARef.current, ringBRef.current],
        { opacity: 0, filter: "blur(6px)", duration: 0.4 },
        2.7,
      )
        .to([fuseFillRef.current, fuseHeadRef.current], { opacity: 0, duration: 0.3 }, 2.7)
        .to(rootRef.current, { opacity: 0, duration: 0.5, ease: "power1.in" }, 3.15);
    }, rootRef);

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-99999 overflow-hidden bg-ember-deep"
      role="status"
      aria-label="Cargando"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(55% 40% at 50% 46%, rgba(229,56,44,0.16), transparent 70%)",
        }}
      />
      <EmberField density={35} className="absolute inset-0" opacity={0.6} />

      <div className="absolute inset-0 flex flex-col items-center justify-center gap-7">
        <div className="relative flex items-center justify-center">
          <div
            ref={ringARef}
            aria-hidden="true"
            className="absolute h-28 w-28 rounded-full border border-flame-orange/50 opacity-0"
          />
          <div
            ref={ringBRef}
            aria-hidden="true"
            className="absolute h-28 w-28 rounded-full border border-flame-red/40 opacity-0"
          />

          <div
            ref={dotRef}
            aria-hidden="true"
            className="absolute h-2 w-2 rounded-full bg-flame-pale shadow-[0_0_16px_6px_rgba(255,179,71,0.9)]"
          />

          <div
            ref={flameWrapRef}
            className="relative drop-shadow-[0_0_30px_rgba(255,107,26,0.6)] will-change-transform"
          >
            <FlameLogo />
          </div>
        </div>

        <div className="flex items-baseline justify-center">
          {BRAND.map((char, i) => (
            <span
              key={`${char}-${i}`}
              ref={(el) => {
                if (el) letterRefs.current[i] = el;
              }}
              className="text-fire inline-block text-3xl md:text-4xl font-black tracking-[0.3em] will-change-transform"
            >
              {char}
            </span>
          ))}
        </div>

        <div className="relative h-px w-56 bg-white/10">
          <div
            ref={fuseFillRef}
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-r from-flame-crimson via-flame-orange to-flame-amber"
          />
          <div
            ref={fuseHeadRef}
            aria-hidden="true"
            className="absolute -top-[3px] left-0 h-[7px] w-[7px] rounded-full bg-flame-pale shadow-[0_0_12px_4px_rgba(255,107,26,0.95)]"
          />
        </div>
      </div>

      <div
        ref={flashRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0"
        style={{
          background:
            "radial-gradient(60% 60% at 50% 46%, rgba(255,232,194,0.9), rgba(255,107,26,0.55) 40%, transparent 72%)",
        }}
      />
    </div>
  );
}
