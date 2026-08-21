import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText as GSAPSplitText } from 'gsap/SplitText';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, GSAPSplitText, useGSAP);

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
  onLetterAnimationComplete
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

          return gsap.fromTo(
            targets,
            { ...from, display: 'inline-block' },
            {
              ...to,
              duration,
              ease,
              stagger: delay / 1000,
              scrollTrigger: {
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
                once: true
              },
              force3D: true,
              clearProps: 'transform',
              onComplete: () => {
                completedRef.current = true;
                onCompleteRef.current?.();
              }
            }
          );
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

  const renderTag = () => {
    const style = {
      textAlign,
      wordBreak: 'break-word'
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
