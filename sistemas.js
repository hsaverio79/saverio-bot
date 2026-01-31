// sistemas.js
function normalizeText(text) {
  return String(text || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

async function diagnosticoPorSistema(rawMensaje) {
  try {
    const texto = normalizeText(rawMensaje);
    if (!texto) return "No se detectó un sistema específico. Describe el problema con más detalle.";

    const mapa = [
      { keys: ["motor", "motor falla", "motor ruido"], reply: "El motor puede tener problemas de combustión, bujías, inyectores o sensores." },
      { keys: ["freno", "frenos", "frenado"], reply: "Los frenos pueden estar desgastados, las pastillas dañadas o el líquido de frenos insuficiente." },
      { keys: ["suspension", "suspensi", "amortiguador", "amortiguadores"], reply: "La suspensión puede tener amortiguadores dañados, resortes fatigados o piezas sueltas." }
    ];

    for (const item of mapa) {
      for (const k of item.keys) {
        if (texto.includes(k)) return item.reply;
      }
    }

    return "No se detectó un sistema específico.";
  } catch (err) {
    console.error("diagnosticoPorSistema error:", err && err.stack ? err.stack : err);
    return "Ocurrió un error al analizar el sistema. Intenta describir el problema de otra forma.";
  }
}

module.exports = { diagnosticoPorSistema };
