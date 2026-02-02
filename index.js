// index.js
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const { botRespond } = require("./botRespond");

const app = express();

// Seguridad
app.use(helmet());

// Rate limiting global
const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false
});
app.use(limiter);

// CORS y JSON
app.use(cors());
app.use(express.json({ limit: "100kb" }));

const PORT = parseInt(process.env.PORT, 10) || 3000;
const BASE_PATH = "/botapp";
const VERIFY_TOKEN = process.env.VERIFY_TOKEN;

function log(...args) {
  console.log(new Date().toISOString(), ...args);
}

// ✅ Verificación de Webhook (GET)
app.get(`${BASE_PATH}/mensaje`, (req, res) => {
  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  if (mode === "subscribe" && token === VERIFY_TOKEN) {
    log("✅ Webhook verificado correctamente");
    return res.status(200).send(challenge);
  } else {
    log("❌ Fallo en verificación de webhook");
    return res.sendStatus(403);
  }
});

// ✅ Recepción de mensajes (POST)
app.post(`${BASE_PATH}/mensaje`, async (req, res) => {
  try {
    const mensaje = req.body?.mensaje ? String(req.body.mensaje) : "";
    if (!mensaje) {
      return res.status(400).json({ ok: false, error: "mensaje is required" });
    }

    const respuesta = await botRespond(mensaje);
    res.json({ ok: true, respuesta });

  } catch (err) {
    log("Error en /mensaje:", err?.stack || err);
    res.status(500).json({ ok: false, error: "Internal server error" });
  }
});

// ✅ Endpoint de prueba
app.get(`${BASE_PATH}/send-test`, (req, res) => {
  res.json({ ok: true, message: "Test endpoint working" });
});

// ✅ Healthcheck
app.get(`${BASE_PATH}/health`, (req, res) => {
  res.json({ ok: true, status: "up" });
});

// ✅ Servidor + apagado elegante
let server = app.listen(PORT, () => log(`🚀 Servidor activo en puerto ${PORT}`));

const shutdown = (signal) => {
  log(`⚠️ Recibido ${signal}. Cerrando servidor...`);
  server.close(() => {
    log("🛑 Servidor cerrado.");
    process.exit(0);
  });

  setTimeout(() => {
    log("⏱️ Apagado forzado.");
    process.exit(1);
  }, 10000).unref();
};

process.on("SIGINT", () => shutdown("SIGINT"));
process.on("SIGTERM", () => shutdown("SIGTERM"));

module.exports = app;
