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

const obtenerIngresosHoy = async (inicioDelDia, finDelDia, limite = 10) => {
  return await Ingreso.find({
    fechaIngreso: { $gte: inicioDelDia, $lt: finDelDia },
  })
    .populate("usuarioId", "nombre apellido estado tipoMembresia")
    .sort({ fechaIngreso: -1 })
    .limit(limite)
    .lean();
};

export default {
  crearIngreso,
  buscarIngresoHoy,
  contarIngresosHoy,
  obtenerIngresosHoy,
};
