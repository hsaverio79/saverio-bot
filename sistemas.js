function diagnosticoPorSistema(mensaje) {
  const texto = mensaje.toLowerCase();

  if (texto.includes("motor")) {
    return "El motor puede tener problemas de combustión, bujías o sensores.";
  }

  if (texto.includes("frenos")) {
    return "Los frenos pueden estar desgastados o tener líquido insuficiente.";
  }

  if (texto.includes("suspensión")) {
    return "La suspensión puede tener amortiguadores dañados o piezas sueltas.";
  }

  return "No se detectó un sistema específico.";
}

module.exports = { diagnosticoPorSistema };