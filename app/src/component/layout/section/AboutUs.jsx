import { motion } from "motion/react";
import SplitText from "../../effect/SplitText";

export default function AboutUs() {
  return (
    <div className="relative w-[92vw] lg:w-[72vw] m-auto mt-24 mb-8 py-10">
      <motion.div
        aria-hidden="true"
        className="absolute left-1/2 top-0 h-px w-full origin-center divider-fire"
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 1.1, ease: "easeOut" }}
      />

      <SplitText
        text="Empresa de desarrollo de software enfocada a ofrecerles servicios al mundo"
        tag="h2"
        className="text-2xl md:text-4xl uppercase font-extrabold tracking-tight text-flame-pale text-center leading-snug"
        delay={18}
        duration={0.9}
        ease="power3.out"
        splitType="words"
        from={{ opacity: 0, y: 30, filter: "blur(6px)" }}
        to={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        threshold={0.1}
        rootMargin="-80px"
        textAlign="center"
      />

      <motion.p
        className="mt-8 max-w-3xl mx-auto text-center text-base md:text-xl leading-relaxed text-ember-muted"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.9, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
      >
        Somos un equipo de programadores argentinos abocados a desarrollar tanto
        webs y aplicaciones móviles como herramientas tecnológicas para
        brindarle las mejores soluciones a sus necesidades.
      </motion.p>

      <motion.div
        aria-hidden="true"
        className="absolute left-1/2 bottom-0 h-px w-full origin-center divider-fire"
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 1.1, delay: 0.15, ease: "easeOut" }}
      />
    </div>
  );
}
