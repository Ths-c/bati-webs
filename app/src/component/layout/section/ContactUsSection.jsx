import { useState } from "react";
import { motion } from "motion/react";
import { FaWhatsapp } from "react-icons/fa";

export default function ContactSimpleForm() {
  const [sending, setSending] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setSending(true);

    const formData = Object.fromEntries(new FormData(e.currentTarget));

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Mensaje enviado");
        e.target.reset();
      } else {
        alert("Error al enviar");
      }
    } catch (error) {
      console.error(error);
      alert("Error del servidor");
    } finally {
      setSending(false);
    }
  }

  return (
    <section className="relative mt-28 py-20 section-glow">
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px divider-fire w-[92vw] lg:w-[80vw] m-auto"
      />

      <motion.div
        className="max-w-2xl mx-auto px-4"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      >
        <h2 className="text-fire text-4xl md:text-5xl font-extrabold uppercase tracking-tight">
          Contacto
        </h2>

        <p className="text-ember-muted mb-10 mt-3">
          Completa el formulario y te responderemos pronto.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="flex flex-col sm:flex-row gap-5">
            <input
              required
              type="text"
              name="firstName"
              placeholder="Nombre"
              className="input-ember"
            />

            <input
              required
              type="text"
              name="lastName"
              placeholder="Apellido"
              className="input-ember"
            />
          </div>

          <input
            required
            type="email"
            name="email"
            placeholder="Email"
            className="input-ember"
          />

          <input
            required
            type="tel"
            name="phone"
            placeholder="Teléfono"
            className="input-ember"
          />

          <textarea
            required
            name="message"
            placeholder="Tu mensaje..."
            rows={5}
            className="input-ember resize-none"
          />

          <button
            type="submit"
            disabled={sending}
            className="btn-fire rounded-full py-3.5 font-bold text-white tracking-wide disabled:opacity-60 disabled:cursor-wait focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-flame-orange"
          >
            Enviar mensaje
          </button>
        </form>

        <p className="text-stone-400 my-10">¿O prefieres contactarnos por WhatsApp?</p>

        <a
          href="https://wa.me/5492921421616"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 bg-[#25D366] text-white py-3 px-7 rounded-full font-semibold transition-all duration-300 hover:bg-[#128C7E] hover:-translate-y-0.5 shadow-[0_8px_30px_-8px_rgba(37,211,102,0.55)] hover:shadow-[0_14px_40px_-8px_rgba(37,211,102,0.75)]"
        >
          <FaWhatsapp className="h-5 w-5" aria-hidden="true" />
          Enviar mensaje a WhatsApp
        </a>
      </motion.div>
    </section>
  );
}
