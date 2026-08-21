import Carousel from "../cards/Carrousel";
import SplitText from "../../effect/SplitText";

export default function whyUsSection({ title = "¿Por qué elegirnos?" }) {
  return (
    <div className="flex flex-col items-center gap-12 mt-28 px-4">
      <SplitText
        text={title}
        tag="h2"
        className="text-fire text-3xl md:text-5xl inline-block font-extrabold uppercase tracking-tight"
        delay={35}
        duration={1}
        ease="power3.out"
        splitType="chars"
        from={{ opacity: 0, y: 50, rotateX: -60 }}
        to={{ opacity: 1, y: 0, rotateX: 0 }}
        threshold={0.1}
        rootMargin="-100px"
        textAlign="center"
      />
      <div className="h-fit">
        <Carousel
          baseWidth="85vw"
          autoplay={false}
          autoplayDelay={3000}
          pauseOnHover={false}
          loop
          round={false}
        />
      </div>
    </div>
  );
}
