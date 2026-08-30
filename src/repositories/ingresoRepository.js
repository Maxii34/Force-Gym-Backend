import Ingreso from "../models/ingresoModel.js";

const crearIngreso = async (usuarioId, dni) => {
  return await Ingreso.create({
    usuarioId,
    dni,
  });
};

const buscarIngresoHoy = async (usuarioId, inicioDelDia) => {
  return await Ingreso.findOne({
    usuarioId,
    fechaIngreso: {
      $gte: inicioDelDia,
    },
  });
};

export default {
  crearIngreso,
  buscarIngresoHoy,
};