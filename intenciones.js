function detectarIntencion(mensaje) {
  const texto = mensaje.toLowerCase();

  if (texto.includes("motor") || texto.includes("frenos") || texto.includes("suspensi¨®n")) {
    return "sistema";
  }

  if (texto.includes("vibra") || texto.includes("ruido") || texto.includes("huele")) {
    return "sintoma";
  }

  return "desconocida";
}

module.exports = { detectarIntencion };