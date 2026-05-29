import { useState } from "react";

export default function ContactSimpleForm() {
  const [selectedCountryPhone, setSelectedCountryPhone] = useState("US");

  async function handleSubmit(e) {
    e.preventDefault();

    const formData = Object.fromEntries(
      new FormData(e.currentTarget)
    );

    try {
      const response = await fetch("http://localhost:3000/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
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
    <section className="py-16">
      <div className="max-w-2xl mx-auto px-4">

        <h2 className="text-4xl font-bold mb-2">
          Contacto
        </h2>

        <p className="text-gray-400 mb-10">
          Completa el formulario y te responderemos pronto.
        </p>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-6"
        >

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

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="privacy"
              required
            />

            <span>
              Acepto la política de privacidad
            </span>
          </label>

          <button
            type="submit"
            className="bg-black text-white py-3 rounded"
          >
            Enviar mensaje
          </button>

        </form>
      </div>
    </section>
  );
}