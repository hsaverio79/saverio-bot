// botRespond.js
const { detectarIntencion } = require("./intenciones");
const { diagnosticoPorSistema } = require("./sistemas");
const { diagnosticoPorSintoma } = require("./sintomas");

function normalizeText(text) {
  return String(text || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

async function botRespond(mensaje) {
  try {
    const limpio = normalizeText(mensaje);
    if (!limpio) return "Necesito que me envíes un mensaje válido.";

    const intencion = detectarIntencion(limpio);

    switch (intencion.tipo) {
      case "sistema":
        return diagnosticoPorSistema(limpio);

      case "sintoma":
        return diagnosticoPorSintoma(limpio);

      case "saludo":
        return "Hola, soy el asistente técnico de Saverio Motors. ¿Qué problema presenta tu vehículo?";

      case "despedida":
        return "Gracias por comunicarte con Saverio Motors. ¡Estamos para ayudarte!";

      default:
        return "No logré identificar el sistema o síntoma. ¿Puedes describir el problema con más detalle?";
    }

  } catch (err) {
    console.error("Error en botRespond:", err);
    return "Ocurrió un error procesando tu mensaje. Intenta nuevamente.";
  }
}

module.exports = { botRespond };
