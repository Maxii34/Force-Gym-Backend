import Renovacion from "../models/renovarUsuario.js";

const crearRenovacion = async (datosRenovacion) => {
  const nuevaRenovacion = new Renovacion(datosRenovacion);
  return await nuevaRenovacion.save();
};

export default {
  crearRenovacion,
};