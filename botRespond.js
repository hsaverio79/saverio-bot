const { detectarIntencion } = require("./intenciones");
const { diagnosticoPorSistema } = require("./sistemas");
const { diagnosticoPorSintoma } = require("./sintomas");

function botRespond(mensaje) {
  const intencion = detectarIntencion(mensaje);

  if (intencion === "sistema") {
    return diagnosticoPorSistema(mensaje);
  }

  if (intencion === "sintoma") {
    return diagnosticoPorSintoma(mensaje);
  }

  return "No pude entender tu mensaje. ¿Puedes describir el problema con más detalle?";
}

module.exports = { botRespond };