// sintomas.js
function normalizeText(text) {
  return String(text || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

async function diagnosticoPorSintoma(rawMensaje) {
  try {
    const texto = normalizeText(rawMensaje);
    if (!texto) return "No se detectó un síntoma. Describe lo que notas en el vehículo.";

    const mapa = [
      { keys: ["vibra", "vibrar", "vibracion", "vibración"], reply: "La vibración puede deberse a frenos deformados, problemas en la suspensión, balanceo de ruedas o problemas en los soportes del motor." },
      { keys: ["ruido", "ruidos", "chasquido", "golpeteo", "clonque"], reply: "El ruido puede venir de piezas sueltas, desgaste, falta de lubricación, cojinetes dañados o problemas en la transmisión." },
      { keys: ["huele", "olor", "huele a", "huele a quemado", "olor a quemado"], reply: "Un olor extraño puede indicar fuga de líquidos, sobrecalentamiento, fricción excesiva o problemas eléctricos." },
      { keys: ["fuga", "goteo", "pierde", "pierde liquido"], reply: "Una fuga puede ser de aceite, refrigerante o combustible; es importante revisar el origen y no conducir si es grave." }
    ];

    for (const item of mapa) {
      for (const k of item.keys) {
        if (texto.includes(k)) return item.reply;
      }
    }

    return "No se detectó un síntoma específico. Intenta describir cuándo ocurre el problema (al frenar, al acelerar, en frío, en caliente).";
  } catch (err) {
    console.error("diagnosticoPorSintoma error:", err && err.stack ? err.stack : err);
    return "Ocurrió un error al analizar el síntoma. Intenta describirlo de otra forma o inténtalo más tarde.";
  }
}

module.exports = { diagnosticoPorSintoma };
