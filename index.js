// index.js
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");   // ← agregado
const { botRespond } = require("./botRespond");

const app = express();
app.use(helmet());                  // ← agregado
app.use(cors());
app.use(express.json({ limit: "100kb" }));

const PORT = parseInt(process.env.PORT, 10) || 3000;
const BASE_PATH = "/botapp";

function log(...args) {
  console.log(new Date().toISOString(), ...args);
}

app.get(`${BASE_PATH}/health`, (req, res) => {
  res.json({ ok: true, status: "up" });
});

app.post(`${BASE_PATH}/mensaje`, async (req, res) => {
  try {
    const mensaje = (req.body && req.body.mensaje) ? String(req.body.mensaje) : "";
    if (!mensaje) return res.status(400).json({ ok: false, error: "mensaje is required" });

    const respuesta = await Promise.resolve(botRespond(mensaje));
    res.json({ ok: true, respuesta });
  } catch (err) {
    log("Error in /mensaje:", err && err.stack ? err.stack : err);
    res.status(500).json({ ok: false, error: "Internal server error" });
  }
});

// Graceful shutdown
let server = app.listen(PORT, () => log(`Server listening on ${PORT}`));
const shutdown = (signal) => {
  log(`Received ${signal}. Shutting down gracefully...`);
  server.close(() => {
    log("HTTP server closed.");
    process.exit(0);
  });
  setTimeout(() => {
    log("Forcing shutdown.");
    process.exit(1);
  }, 10000).unref();
};
process.on("SIGINT", () => shutdown("SIGINT"));
process.on("SIGTERM", () => shutdown("SIGTERM"));

// Export app for testing if needed
module.exports = app;
