import Ingreso from "../models/Ingreso.js";

const buscarIngresoHoy = async (usuarioId, inicioDelDia) => {
  return await Ingreso.findOne({
    usuarioId,
    fechaIngreso: { $gte: inicioDelDia },
  });
};

const crearIngreso = async (usuarioId, dni) => {
  return await Ingreso.create({ usuarioId, dni });
};

export default {
  buscarIngresoHoy,
  crearIngreso,
};
