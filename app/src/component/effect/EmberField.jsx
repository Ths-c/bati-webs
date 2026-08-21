import { useEffect, useRef } from "react";

const COLORS = ["#ff6b1a", "#e5382c", "#ffb347", "#ffe8c2"];

export default function EmberField({ density = 55, className = "", opacity = 1 }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let raf;
    let w = 0;
    let h = 0;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const resize = () => {
      w = canvas.offsetWidth;
      h = canvas.offsetHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const spawn = (initial = false) => ({
      x: Math.random() * w,
      y: initial ? Math.random() * h : h + 10,
      r: 0.8 + Math.random() * 2.4,
      vy: 0.35 + Math.random() * 1.1,
      sway: Math.random() * Math.PI * 2,
      swaySpeed: 0.004 + Math.random() * 0.012,
      swayAmp: 14 + Math.random() * 30,
      color: COLORS[(Math.random() * COLORS.length) | 0],
      flicker: Math.random() * Math.PI * 2,
      flickerSpeed: 0.03 + Math.random() * 0.06,
      alpha: 0.25 + Math.random() * 0.5,
    });

    const count = Math.max(10, Math.min(density, (w * h) / 22000));
    const embers = Array.from({ length: count }, () => spawn(true));

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      for (let i = 0; i < embers.length; i++) {
        const e = embers[i];
        e.y -= e.vy;
        e.sway += e.swaySpeed * 16;
        e.flicker += e.flickerSpeed;

        if (e.y < -12 || e.x < -20 || e.x > w + 20) {
          embers[i] = spawn();
          continue;
        }

        const x = e.x + Math.sin(e.sway) * e.swayAmp * 0.16;
        const twinkle = 0.55 + 0.45 * Math.sin(e.flicker);
        const a = e.alpha * twinkle;

        const glow = ctx.createRadialGradient(x, e.y, 0, x, e.y, e.r * 4);
        glow.addColorStop(0, e.color);
        glow.addColorStop(1, "transparent");
        ctx.globalAlpha = a;
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(x, e.y, e.r * 4, 0, Math.PI * 2);
        ctx.fill();

        ctx.globalAlpha = Math.min(1, a + 0.15);
        ctx.fillStyle = e.color;
        ctx.beginPath();
        ctx.arc(x, e.y, e.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(draw);
    };

    if (reduced) {
      ctx.clearRect(0, 0, w, h);
    } else {
      raf = requestAnimationFrame(draw);
    }

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [density]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`pointer-events-none ${className}`}
      style={{ width: "100%", height: "100%", opacity }}
    />
  );
}
