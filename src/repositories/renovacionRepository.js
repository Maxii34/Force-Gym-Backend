import Renovacion from "../models/renovarUsuario.js";

const crearRenovacion = async (datosRenovacion) => {
  const nuevaRenovacion = new Renovacion(datosRenovacion);
  return await nuevaRenovacion.save();
};

const obtenerRenovacionesRecientes = async (limite = 10) => {
  return await Renovacion.find().sort({ createdAt: -1 }).limit(limite).lean();
};

export default {
  crearRenovacion,
  obtenerRenovacionesRecientes,
};