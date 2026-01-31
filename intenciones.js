// intenciones.js
function normalizeText(text) {
  return String(text || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // elimina diacríticos
    .toLowerCase()
    .trim();
}

function detectarIntencion(mensaje) {
  const texto = normalizeText(mensaje);

  if (!texto) return "desconocida";

  const sistemaKeywords = ["motor", "freno", "frenos", "suspension", "suspensi", "transmision", "embrague"];
  const sintomaKeywords = ["vibra", "vibrar", "ruido", "huele", "olor", "calienta", "falla"];

  for (const k of sistemaKeywords) {
    if (texto.includes(k)) return "sistema";
  }

  for (const k of sintomaKeywords) {
    if (texto.includes(k)) return "sintoma";
  }

  return "desconocida";
}

module.exports = { detectarIntencion };
