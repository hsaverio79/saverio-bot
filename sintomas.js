function diagnosticoPorSintoma(mensaje) {
  const texto = mensaje.toLowerCase();

  if (texto.includes("vibra")) {
    return "La vibración puede deberse a frenos deformados o problemas en la suspensión.";
  }

  if (texto.includes("ruido")) {
    return "El ruido puede venir de piezas sueltas, desgaste o falta de lubricación.";
  }

  if (texto.includes("huele")) {
    return "Un olor extraño puede indicar fuga de líquidos o sobrecalentamiento.";
  }

  return "No se detectó un síntoma específico.";
}

module.exports = { diagnosticoPorSintoma };