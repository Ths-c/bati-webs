import SplitText from "../../effect/SplitText";
import EmberField from "../../effect/EmberField";

export default function MainHero({ title, highlightedWord, buttonText, buttonLink }) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(70% 55% at 50% 100%, rgba(229,56,44,0.28), transparent 65%), radial-gradient(40% 30% at 50% 0%, rgba(255,107,26,0.08), transparent 60%)",
        }}
      />
      <EmberField density={70} className="absolute inset-0" />

      <div
        aria-hidden="true"
        className="absolute -left-40 top-1/4 h-96 w-96 rounded-full bg-flame-red/15 blur-[120px] animate-float-slow"
      />
      <div
        aria-hidden="true"
        className="absolute -right-32 bottom-1/4 h-80 w-80 rounded-full bg-flame-orange/15 blur-[110px] animate-float-slow"
        style={{ animationDelay: "-3.5s" }}
      />

      <div className="relative z-10 mx-auto max-w-6xl px-6 flex flex-col items-center gap-10 pt-24 pb-20 text-center">
        <h1 className="font-extrabold uppercase leading-[1.05] tracking-tight text-5xl sm:text-6xl lg:text-8xl">
          <SplitText
            text={title}
            tag="span"
            className="inline-block mr-4 align-top"
            delay={45}
            duration={1.25}
            ease="power3.out"
            splitType="chars"
            from={{ opacity: 0, y: 60, rotateX: -40 }}
            to={{ opacity: 1, y: 0, rotateX: 0 }}
            threshold={0.1}
            rootMargin="-100px"
            textAlign="center"
          />
          <SplitText
            text={highlightedWord}
            tag="span"
            className="text-fire inline-block align-top drop-shadow-[0_0_35px_rgba(255,107,26,0.45)]"
            delay={45}
            duration={1.25}
            ease="power3.out"
            splitType="chars"
            from={{ opacity: 0, y: 60, scale: 0.7 }}
            to={{ opacity: 1, y: 0, scale: 1 }}
            threshold={0.1}
            rootMargin="-100px"
            textAlign="center"
          />
        </h1>

        <a
          href={buttonLink}
          className="btn-fire animate-glow-pulse group relative inline-flex items-center gap-3 rounded-full px-9 py-4 text-lg font-bold text-white focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-flame-orange"
        >
          {buttonText}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-5 w-5 transition-transform duration-300 group-hover:translate-y-0.5"
            aria-hidden="true"
          >
            <path d="M12 5v14" />
            <path d="m19 12-7 7-7-7" />
          </svg>
        </a>
      </div>

      <div
        aria-hidden="true"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-flame-amber/80"
      >
        <span className="block h-10 w-[1.5px] bg-gradient-to-b from-transparent via-flame-orange to-transparent" />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-5 w-5 animate-scroll-hint"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </div>
    </section>
  );
}
