const { detectarIntencion } = require("./intenciones");
const { diagnosticoPorSistema } = require("./sistemas");
const { diagnosticoPorSintoma } = require("./sintomas");

async function botRespond(rawMensaje) {
  try {
    const mensaje = (typeof rawMensaje === "string") ? rawMensaje.trim() : "";
    if (!mensaje) return "No recibí un mensaje válido. Por favor escribe tu síntoma o sistema afectado.";

    const intencion = await Promise.resolve(detectarIntencion(mensaje));

    if (intencion === "sistema") {
      return await Promise.resolve(diagnosticoPorSistema(mensaje));
    }

    if (intencion === "sintoma") {
      return await Promise.resolve(diagnosticoPorSintoma(mensaje));
    }

    return "No pude entender tu mensaje. ¿Puedes describir el problema con más detalle?";
  } catch (err) {
    console.error("botRespond error:", err && err.stack ? err.stack : err);
    return "Ocurrió un error procesando tu mensaje. Intenta de nuevo más tarde.";
  }
}

module.exports = { botRespond };
