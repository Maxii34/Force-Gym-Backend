import Ingreso from "../models/ingreso.js";

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

const contarIngresosHoy = async (inicioDelDia, finDelDia) => {
  return await Ingreso.countDocuments({
    fechaIngreso: {
      $gte: inicioDelDia,
      $lt: finDelDia,
    },
  });
};

export default {
  crearIngreso,
  buscarIngresoHoy,
  contarIngresosHoy,
};
