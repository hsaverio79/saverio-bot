// intenciones.js

function normalizeText(text) {
  return String(text || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

const palabrasSistema = [
  "motor", "freno", "frenos", "suspension", "direccion",
  "transmision", "embrague", "bateria", "alternador",
  "radiador", "refrigeracion", "escape", "inyeccion"
];

const palabrasSintoma = [
  "ruido", "golpe", "vibracion", "vibra", "humo",
  "falla", "apagado", "no enciende", "calienta",
  "temperatura", "tironeo", "jaloneo", "pierde fuerza"
];

const saludos = ["hola", "buenas", "saludos", "que tal"];
const despedidas = ["gracias", "hasta luego", "adios", "nos vemos"];

function detectarIntencion(texto) {
  const limpio = normalizeText(texto);

  if (!limpio) return { tipo: "desconocido" };

  if (saludos.some(s => limpio.includes(s))) {
    return { tipo: "saludo" };
  }

  if (despedidas.some(d => limpio.includes(d))) {
    return { tipo: "despedida" };
  }

  if (palabrasSistema.some(p => limpio.includes(p))) {
    return { tipo: "sistema" };
  }

  if (palabrasSintoma.some(p => limpio.includes(p))) {
    return { tipo: "sintoma" };
  }

  return { tipo: "desconocido" };
}

module.exports = { detectarIntencion };
