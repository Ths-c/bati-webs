import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText as GSAPSplitText } from 'gsap/SplitText';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, GSAPSplitText);

const SplitText = ({
  text,
  className = '',
  delay = 50,
  duration = 1.25,
  ease = 'power3.out',
  splitType = 'chars',
  from = { opacity: 0, y: 40 },
  to = { opacity: 1, y: 0 },
  threshold = 0.1,
  rootMargin = '-100px',
  textAlign = 'center',
  tag = 'p',
  onLetterAnimationComplete,
  disableScrollTrigger = false
}) => {
  const ref = useRef(null);
  const completedRef = useRef(false);
  const onCompleteRef = useRef(onLetterAnimationComplete);
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    onCompleteRef.current = onLetterAnimationComplete;
  }, [onLetterAnimationComplete]);

  useEffect(() => {
    let active = true;
    const markLoaded = () => {
      if (active) setFontsLoaded(true);
    };
    if (!document.fonts || document.fonts.status === 'loaded') {
      markLoaded();
    } else {
      document.fonts.ready.then(markLoaded);
    }
    return () => {
      active = false;
    };
  }, []);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el || !text || !fontsLoaded || completedRef.current) return;

      // En móviles con preloader, el hero ya está en viewport pero ScrollTrigger
      // calcula start cuando el overlay fijo aún tapa: queda en opacity 0 para siempre.
      // Si el elemento ya está visible al montar, animar sin ScrollTrigger.
      const rect = el.getBoundingClientRect();
      const inInitialViewport = rect.top < window.innerHeight * 0.92 && rect.bottom > 0;
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReduced) {
        // Sin animación: mostrar directo
        return;
      }

      let marginPx = 0;
      const marginMatch = /^(-?\d+(?:\.\d+)?)(px|em|rem|%)?$/.exec(rootMargin ?? '');
      if (marginMatch) {
        const value = parseFloat(marginMatch[1]);
        const unit = marginMatch[2] || 'px';
        if (unit === '%') {
          // los porcentajes se resuelven contra el viewport al momento del trigger
          marginPx = (value / 100) * (typeof window !== 'undefined' ? window.innerHeight : 800);
        } else {
          const factor =
            unit === 'em'
              ? parseFloat(getComputedStyle(el).fontSize) || 16
              : unit === 'rem'
                ? parseFloat(getComputedStyle(document.documentElement).fontSize) || 16
                : 1;
          marginPx = value * factor;
        }
      }

      const basePct = Math.max(0, Math.min(100, (1 - threshold) * 100));

      const splitInstance = new GSAPSplitText(el, {
        type: splitType,
        smartWrap: true,
        autoSplit: splitType === 'lines',
        linesClass: 'split-line',
        wordsClass: 'split-word',
        charsClass: 'split-char',
        reduceWhiteSpace: false,
        onSplit: self => {
          const targets =
            self.chars?.length ? self.chars
            : self.words?.length ? self.words
            : self.lines;

          if (!targets || targets.length === 0) return null;

          // Fallback móvil: si ScrollTrigger no dispara en 2.5s, forzar visible
          const fallback = setTimeout(() => {
            if (!completedRef.current) {
              gsap.set(targets, { ...to, display: 'inline-block', clearProps: 'transform' });
              completedRef.current = true;
              onCompleteRef.current?.();
              ScrollTrigger.refresh();
            }
          }, 2500);

          const useScroll = !disableScrollTrigger && !inInitialViewport;
          const tween = gsap.fromTo(
            targets,
            { ...from, display: 'inline-block' },
            {
              ...to,
              duration,
              ease,
              stagger: delay / 1000,
              scrollTrigger: useScroll
                ? {
                    trigger: el,
                    start: () => {
                      const vh = window.innerHeight || 800;
                      // rootMargin negativo = disparar más tarde; positivo = más temprano
                      const adjPct = (Math.abs(marginPx) / vh) * 100;
                      const pct =
                        marginPx < 0
                          ? basePct - adjPct
                          : basePct + adjPct;
                      return `top ${Math.max(0, Math.min(100, pct))}%`;
                    },
                    once: true,
                    invalidateOnRefresh: true
                  }
                : undefined,
              force3D: true,
              clearProps: 'transform',
              onComplete: () => {
                clearTimeout(fallback);
                completedRef.current = true;
                onCompleteRef.current?.();
              }
            }
          );

          // Si es hero (ya en viewport) asegurar que ScrollTrigger no lo deje oculto
          if (inInitialViewport || disableScrollTrigger) {
            // Pequeño refresh para que otros triggers recalculen con el nuevo layout
            requestAnimationFrame(() => ScrollTrigger.refresh());
          }

          return tween;
        }
      });

      return () => {
        try {
          splitInstance.revert();
        } catch {
          /* noop */
        }
      };
    },
    {
      dependencies: [
        text,
        delay,
        duration,
        ease,
        splitType,
        JSON.stringify(from),
        JSON.stringify(to),
        threshold,
        rootMargin,
        fontsLoaded
      ],
      scope: ref
    }
  );

  // En móviles el viewport cambia al ocultar/mostrar la barra de direcciones: refrescar ScrollTrigger
  useEffect(() => {
    const onResize = () => ScrollTrigger.refresh();
    window.addEventListener('resize', onResize);
    // iOS Safari dispara resize tardío al cargar fuentes
    const t = setTimeout(() => ScrollTrigger.refresh(), 600);
    return () => {
      window.removeEventListener('resize', onResize);
      clearTimeout(t);
    };
  }, [fontsLoaded]);

  const renderTag = () => {
    const style = {
      textAlign,
      wordBreak: 'break-word',
      overflowWrap: 'anywhere',
      // Necesario para que rotateX/scale se vean correctos en móviles (iOS necesita perspective)
      perspective: '800px',
      transformStyle: 'preserve-3d'
    };
    const classes = `split-parent overflow-hidden whitespace-normal ${className}`;
    const Tag = tag || 'p';

    return (
      <Tag ref={ref} style={style} className={classes}>
        {text}
      </Tag>
    );
  };

  return renderTag();
};

export default SplitText;
