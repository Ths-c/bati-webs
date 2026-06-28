import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { Resend } from "resend";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const resend = new Resend(process.env.RESEND_API_KEY);

app.post("/api/contact", async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      phone,
      message
    } = req.body;

    const data = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: "websbati@gmail.com",
      subject: `Nuevo mensaje de ${firstName}`,
      html: `
        <h1>Nuevo contacto</h1>

        <p><strong>Nombre:</strong> ${firstName} ${lastName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Telefono:</strong> ${phone}</p>

        <p><strong>Mensaje:</strong></p>
        <p>${message}</p>
      `
    });

    res.status(200).json(data);

  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Error enviando email"
    });
  }
});

app.listen(3000, () => {
  console.log("Servidor corriendo en puerto 3000");
});