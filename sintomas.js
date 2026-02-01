// sintomas.js

function normalizeText(text) {
  return String(text || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

const respuestasSintoma = {
  ruido: "Un ruido puede indicar desgaste en suspensión, frenos, rodamientos o piezas sueltas. Se recomienda inspección en elevador.",
  golpe: "Un golpe al pasar baches o al girar suele ser por bujes, rótulas o amortiguadores dañados.",
  vibracion: "Las vibraciones pueden venir de llantas desbalanceadas, soportes de motor o problemas en la transmisión.",
  vibra: "Las vibraciones pueden venir de llantas desbalanceadas, soportes de motor o problemas en la transmisión.",
  humo: "El humo puede indicar problemas de combustión, aceite quemándose o fallas en el sistema de escape.",
  falla: "Una falla puede deberse a sensores, inyección, bobinas o problemas eléctricos.",
  apagado: "Si el vehículo se apaga, puede ser por bomba de combustible, sensores o fallas eléctricas.",
  "no enciende": "Si no enciende, revisa batería, alternador, motor de arranque o fusibles.",
  calienta: "El sobrecalentamiento puede deberse a radiador, termostato, bomba de agua o ventilador.",
  temperatura: "Si sube la temperatura, revisa refrigerante, fugas o ventiladores.",
  tironeo: "El tironeo suele ser por inyectores sucios, bobinas o problemas de combustible.",
  jaloneo: "El jaloneo suele ser por inyectores sucios, bobinas o problemas de combustible.",
  "pierde fuerza": "La pérdida de fuerza puede deberse a filtro de aire, combustible, turbo, inyección o sensores."
};

function diagnosticoPorSintoma(texto) {
  const limpio = normalizeText(texto);

  for (const sintoma in respuestasSintoma) {
    if (limpio.includes(sintoma)) {
      return respuestasSintoma[sintoma];
    }
  }

  return "No pude identificar el síntoma exacto. ¿Puedes describir con más detalle qué hace el vehículo?";
}

module.exports = { diagnosticoPorSintoma };
