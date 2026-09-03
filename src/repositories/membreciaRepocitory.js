import Membresia from "../models/membrecias.js";
import UsuarioData from "../models/usuarioDatos.js";

const createMembresia = async (membresiaData) => {
  return await Membresia.create(membresiaData);
};

const obtenerMembresias = async () => {
  const usuariosCollection = UsuarioData.collection.name;
  return await Membresia.aggregate([
    {
      $lookup: {
        from: usuariosCollection,
        localField: "_id",
        foreignField: "membresia",
        as: "socios",
      },
    },
    {
      $addFields: {
        totalSocios: { $size: "$socios" },
      },
    },
    {
      $project: {
        socios: 0,
      },
    },
  ]);
};

const obtenerMembresiaPorId = async (id) => {
  return await Membresia.findById(id);
};

const actualizarMembresia = async (id, membresiaData) => {
  return await Membresia.findByIdAndUpdate(
    id,
    membresiaData,
    {
      new: true,
      runValidators: true,
    }
  );
};

const eliminarMembresia = async (id) => {
  return await Membresia.findByIdAndDelete(id);
};

// Obtener únicamente los planes disponibles
const obtenerMembresiasActivas = async () => {
  return await Membresia.find({ activa: true });
};

// Cantidad total de planes creados
const contarMembresias = async () => {
  return await Membresia.countDocuments();
};

// Cantidad de planes activos
const contarMembresiasActivas = async () => {
  return await Membresia.countDocuments({ activa: true });
};

// Cantidad de planes inactivos
const contarMembresiasInactivas = async () => {
  return await Membresia.countDocuments({ activa: false });
};

export default {
  createMembresia,
  obtenerMembresias,
  obtenerMembresiaPorId,
  actualizarMembresia,
  eliminarMembresia,
  obtenerMembresiasActivas,
  contarMembresias,
  contarMembresiasActivas,
  contarMembresiasInactivas,
};