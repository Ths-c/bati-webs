import { useEffect, useMemo, useRef, useState } from 'react';
import { motion, useMotionValue, useTransform } from 'motion/react';
// replace icons with your own if needed
import { FiCircle, FiCode, FiFigma, FiLayers, FiLayout } from 'react-icons/fi';
import { FaCommentDollar } from "react-icons/fa";
import FigmaImg from '../../../assets/img/figma-bundle-ej.avif';
import DollarWasting from '../../../assets/img/dollar-wasting.svg'
import HelpAsis from '../../../assets/img/help.svg'


const DEFAULT_ITEMS = [
  {
    title: 'Diseño UX/UI previo a la realización del proyecto.',
    description: 'Te damos un diseño previo de tu proyecto para que puedas visualizarlo antes de su realización para evitarte malas sorpresas en el diseño final.',
    id: 1,
    image: FigmaImg,
    icon: <FiFigma className="h-[16px] w-[16px] text-white" />
  },
  {
    title: 'Opciones de pago adaptadas a usted.',
    description: 'Puede pagar en cuotas o en un solo pago, lo que se adapte mejor a sus necesidades.',
    id: 2,
    image: DollarWasting,
    icon: <FaCommentDollar className='size-[16px] text-white' />
  },
  {
    title: 'Equipo capacitado',
    description: 'Nuestro equipo está compuesto por profesionales capacitados en sus respectivas áreas, lo que garantiza un trabajo de calidad y resultados excepcionales.',
    id: 3,
    image: HelpAsis,
    icon: <FiLayers className="h-[16px] w-[16px] text-white" />
  },
  {
    title: 'Diseño responsive 100% adaptable a cualquier dispositivo.',
    description: 'Nos comprometemos a que nuestro diseño sea completamente responsivo y se adapte a cualquier dispositivo, garantizando una excelente experiencia de usuario en todos los entornos.',
    id: 4,
    icon: <FiLayout className="h-[16px] w-[16px] text-white" />
  },
  {
    title: 'Precios adaptados a su presupuesto.',
    description: 'Ofrecemos opciones de pago flexibles para que se ajusten a tu presupuesto y necesidades.',
    id: 5,
    icon: <FiCode className="h-[16px] w-[16px] text-white" />
  }
];

const DRAG_BUFFER = 0;
const VELOCITY_THRESHOLD = 500;
const GAP = 16;
const SPRING_OPTIONS = { type: 'spring', stiffness: 300, damping: 30 };

function CarouselItem({ item, index, itemWidth, round, trackItemOffset, x, transition }) {
  const range = [-(index + 1) * trackItemOffset, -index * trackItemOffset, -(index - 1) * trackItemOffset];
  const outputRange = [90, 0, -90];
  const rotateY = useTransform(x, range, outputRange, { clamp: false });

  return (
    <motion.div
      key={`${item?.id ?? index}-${index}`}
      className={`relative shrink-0 flex flex-col ${round
        ? 'items-center justify-center text-center bg-[#120F17] border-0'
        : 'items-start bg-[#222] border border-[#222] rounded-[12px] w-full lg:w-[55vw]'
        } overflow-hidden cursor-grab active:cursor-grabbing`}
      classNme={{
        width: 'w-[85vw] lg:60vw',
        height: round ? itemWidth : '70vh',
        rotateY: rotateY,
        ...(round && { borderRadius: '50%' })
      }}
      transition={transition}
    >
      <div className={`${round ? 'p-0 m-0' : 'mb-4 p-5'} w-full`}>
        {item.image ? (
          <img
            src={item.image}
            alt={item.title}
            className="hidden sm:block w-full h-[55vh] rounded-xl select-none"
          />
        ) : (
          <span className="flex h-[28px] w-[28px] items-center justify-center rounded-full bg-[#120F17]">
            {item.icon}
          </span>
        )}
      </div>
      <div className="p-5">
        <div className="mb-1 font-black text-lg text-white">{item.title}</div>
        <p className="text-sm text-white">{item.description}</p>
      </div>
    </motion.div>
  );
}

export default function Carousel({
  items = DEFAULT_ITEMS,
  baseWidth = 300,
  autoplay = false,
  autoplayDelay = 3000,
  pauseOnHover = false,
  loop = false,
  round = false
}) {
  const containerPadding = 16;
  const numericBaseWidth =
    typeof baseWidth === 'number'
      ? baseWidth
      : window.innerWidth * 0.85;

  const itemWidth = numericBaseWidth - containerPadding * 2;

  const trackItemOffset = itemWidth + GAP;
  const itemsForRender = useMemo(() => {
    if (!loop) return items;
    if (items.length === 0) return [];
    return [items[items.length - 1], ...items, items[0]];
  }, [items, loop]);

  const [position, setPosition] = useState(loop ? 1 : 0);
  const x = useMotionValue(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isJumping, setIsJumping] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const containerRef = useRef(null);
  useEffect(() => {
    if (pauseOnHover && containerRef.current) {
      const container = containerRef.current;
      const handleMouseEnter = () => setIsHovered(true);
      const handleMouseLeave = () => setIsHovered(false);
      container.addEventListener('mouseenter', handleMouseEnter);
      container.addEventListener('mouseleave', handleMouseLeave);
      return () => {
        container.removeEventListener('mouseenter', handleMouseEnter);
        container.removeEventListener('mouseleave', handleMouseLeave);
      };
    }
  }, [pauseOnHover]);

  useEffect(() => {
    if (!autoplay || itemsForRender.length <= 1) return undefined;
    if (pauseOnHover && isHovered) return undefined;

    const timer = setInterval(() => {
      setPosition(prev => Math.min(prev + 1, itemsForRender.length - 1));
    }, autoplayDelay);

    return () => clearInterval(timer);
  }, [autoplay, autoplayDelay, isHovered, pauseOnHover, itemsForRender.length]);

  useEffect(() => {
    const startingPosition = loop ? 1 : 0;
    setPosition(startingPosition);
    x.set(-startingPosition * trackItemOffset);
  }, [items.length, loop, trackItemOffset, x]);

  useEffect(() => {
    if (!loop && position > itemsForRender.length - 1) {
      setPosition(Math.max(0, itemsForRender.length - 1));
    }
  }, [itemsForRender.length, loop, position]);

  const effectiveTransition = isJumping ? { duration: 0 } : SPRING_OPTIONS;

  const handleAnimationStart = () => {
    setIsAnimating(true);
  };

  const handleAnimationComplete = () => {
    if (!loop || itemsForRender.length <= 1) {
      setIsAnimating(false);
      return;
    }
    const lastCloneIndex = itemsForRender.length - 1;

    if (position === lastCloneIndex) {
      setIsJumping(true);
      const target = 1;
      setPosition(target);
      x.set(-target * trackItemOffset);
      requestAnimationFrame(() => {
        setIsJumping(false);
        setIsAnimating(false);
      });
      return;
    }

    if (position === 0) {
      setIsJumping(true);
      const target = items.length;
      setPosition(target);
      x.set(-target * trackItemOffset);
      requestAnimationFrame(() => {
        setIsJumping(false);
        setIsAnimating(false);
      });
      return;
    }

    setIsAnimating(false);
  };

  const handleDragEnd = (_, info) => {
    const { offset, velocity } = info;
    const direction =
      offset.x < -DRAG_BUFFER || velocity.x < -VELOCITY_THRESHOLD
        ? 1
        : offset.x > DRAG_BUFFER || velocity.x > VELOCITY_THRESHOLD
          ? -1
          : 0;

    if (direction === 0) return;

    setPosition(prev => {
      const next = prev + direction;
      const max = itemsForRender.length - 1;
      return Math.max(0, Math.min(next, max));
    });
  };

  const dragProps = loop
    ? {}
    : {
      dragConstraints: {
        left: -trackItemOffset * Math.max(itemsForRender.length - 1, 0),
        right: 0
      }
    };

  const activeIndex =
    items.length === 0 ? 0 : loop ? (position - 1 + items.length) % items.length : Math.min(position, items.length - 1);

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden p-4 ${round ? 'rounded-full border border-white' : 'none'
        }`}
      style={{
        width: typeof baseWidth === 'number'
          ? `${baseWidth}px`
          : baseWidth,

        ...(round && {
          height: typeof baseWidth === 'number'
            ? `${baseWidth}px`
            : baseWidth
        })
      }}
    >
      <motion.div
        className="flex"
        drag={isAnimating ? false : 'x'}
        {...dragProps}
        style={{
          width: `${itemWidth}px`,
          gap: `${GAP}px`,
          perspective: 1000,
          perspectiveOrigin: `${position * trackItemOffset + itemWidth / 2}px 50%`,
          x
        }}
        onDragEnd={handleDragEnd}
        animate={{ x: -(position * trackItemOffset) }}
        transition={effectiveTransition}
        onAnimationStart={handleAnimationStart}
        onAnimationComplete={handleAnimationComplete}
      >
        {itemsForRender.map((item, index) => (
          <CarouselItem
            key={`${item?.id ?? index}-${index}`}
            item={item}
            index={index}
            itemWidth={itemWidth}
            round={round}
            trackItemOffset={trackItemOffset}
            x={x}
            transition={effectiveTransition}
          />
        ))}
      </motion.div>
      <div className={`flex w-full justify-center ${round ? 'absolute z-20 bottom-12 left-1/2 -translate-x-1/2' : ''}`}>
        <div className="mt-4 flex w-[250px] justify-between px-8">
          {items.map((_, index) => (
            <motion.div
              key={index}
              className={`h-4 w-4 rounded-full cursor-pointer transition-colors duration-150 ${activeIndex === index
                ? round
                  ? 'bg-white'
                  : 'bg-[#333333]'
                : round
                  ? 'bg-[#555]'
                  : 'bg-[rgba(51,51,51,0.4)]'
                }`}
              animate={{
                scale: activeIndex === index ? 1.2 : 1
              }}
              onClick={() => setPosition(loop ? index + 1 : index)}
              transition={{ duration: 0.15 }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
