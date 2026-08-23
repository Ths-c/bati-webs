import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export default async function handler(req, res) {
  if (req.method === "OPTIONS") {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    res.setHeader("Allow", "POST, OPTIONS");
    return res.status(405).json({ error: "Method not allowed" });
  }

  if (!process.env.RESEND_API_KEY) {
    return res.status(500).json({ error: "Missing RESEND_API_KEY" });
  }

  try {
    const { firstName, lastName, email, phone, message } = req.body ?? {};

    if (!firstName || !lastName || !email || !phone || !message) {
      return res.status(400).json({ error: "Faltan campos requeridos" });
    }

    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRe.test(email)) {
      return res.status(400).json({ error: "Email inválido" });
    }

    // En modo testing Resend solo permite enviar al email del dueño de la API key.
    // Para enviar a ignitex.web@gmail.com hay que verificar un dominio en resend.com/domains
    // y usar un `from` de ese dominio, o generar una API key con la cuenta ignitex.web@gmail.com.
    const contactRecipient = process.env.CONTACT_TO_EMAIL || "websbati@gmail.com";
    const data = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: contactRecipient,
      subject: `Nuevo mensaje de ${escapeHtml(firstName)}`,
      html: `
        <h1>Nuevo contacto</h1>
        <p><strong>Nombre:</strong> ${escapeHtml(firstName)} ${escapeHtml(lastName)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Telefono:</strong> ${escapeHtml(phone)}</p>
        <p><strong>Mensaje:</strong></p>
        <p>${escapeHtml(message).replace(/\n/g, "<br />")}</p>
      `,
    });

    if (data.error) {
      console.error("Resend error:", data.error);
      return res.status(502).json({ error: "Error enviando email", details: data.error });
    }

    return res.status(200).json(data);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error enviando email" });
  }
}
