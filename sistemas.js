// sistemas.js

function normalizeText(text) {
  return String(text || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

const respuestasSistema = {
  motor: "El sistema de motor puede presentar fallas por bujías, bobinas, inyección o sensores. Te recomiendo una revisión de diagnóstico computarizado.",
  freno: "El sistema de frenos requiere atención inmediata. Puede ser desgaste de pastillas, discos, fuga de líquido o bomba defectuosa.",
  frenos: "El sistema de frenos requiere atención inmediata. Puede ser desgaste de pastillas, discos, fuga de líquido o bomba defectuosa.",
  suspension: "La suspensión puede generar ruidos o inestabilidad si hay bujes, amortiguadores o rótulas desgastadas.",
  direccion: "La dirección puede fallar por bomba hidráulica, cremallera o falta de lubricación.",
  transmision: "La transmisión puede presentar tirones o falta de fuerza por bajo nivel de aceite, desgaste interno o fallas electrónicas.",
  embrague: "El embrague puede patinar o generar dificultad al cambiar si el disco o el plato están desgastados.",
  bateria: "Una batería débil puede causar apagones, arranque lento o fallas eléctricas.",
  alternador: "El alternador defectuoso puede no cargar la batería y causar fallas eléctricas.",
  radiador: "El radiador puede causar sobrecalentamiento si hay fugas, obstrucciones o falta de refrigerante.",
  refrigeracion: "El sistema de refrigeración debe revisarse si el vehículo calienta. Puede ser termostato, bomba de agua o ventilador.",
  escape: "El sistema de escape puede generar ruido o pérdida de potencia si hay fugas o catalizador obstruido.",
  inyeccion: "La inyección electrónica puede causar fallas de potencia, consumo elevado o tironeos si los inyectores están sucios."
};

function diagnosticoPorSistema(texto) {
  const limpio = normalizeText(texto);

  for (const sistema in respuestasSistema) {
    if (limpio.includes(sistema)) {
      return respuestasSistema[sistema];
    }
  }

  return "No pude identificar el sistema exacto. ¿Puedes describir un poco más el área del vehículo donde ocurre la falla?";
}

module.exports = { diagnosticoPorSistema };
