import { useState } from "react";

export default function ContactSimpleForm() {
  async function handleSubmit(e) {
    e.preventDefault();

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
    }
  }

  return (
    <section className="mt-20 py-16 bg-gray-100">
      <div className="max-w-2xl mx-auto px-4">
        <h2 className="text-4xl font-bold mb-2">Contacto</h2>

        <p className="text-gray-400 mb-10">
          Completa el formulario y te responderemos pronto.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="flex gap-4">
            <input
              required
              type="text"
              name="firstName"
              placeholder="Nombre"
              className="w-full border p-3 rounded"
            />

            <input
              required
              type="text"
              name="lastName"
              placeholder="Apellido"
              className="w-full border p-3 rounded"
            />
          </div>

          <input
            required
            type="email"
            name="email"
            placeholder="Email"
            className="border p-3 rounded"
          />

          <input
            required
            type="tel"
            name="phone"
            placeholder="Teléfono"
            className="border p-3 rounded"
          />

          <textarea
            required
            name="message"
            placeholder="Tu mensaje..."
            rows={5}
            className="border p-3 rounded"
          />

          <button type="submit" className="bg-black text-white py-3 rounded">
            Enviar mensaje
          </button>
        </form>

        <p className="text-gray-600 my-10">
          ¿O prefieres contactarnos por WhatsApp?
        </p>
        <a
          href="https://wa.me/5492921421616"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-[#25D366] text-white py-3 px-6 rounded-full hover:bg-[#128C7E] lg:transition lg:duration-300"
        >
          Enviar mensaje a WhatsApp
        </a>
      </div>
    </section>
  );
}
