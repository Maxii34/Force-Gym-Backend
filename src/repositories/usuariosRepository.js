import UsuarioData from "../models/usuarioDatos.js";

const crearUsuario = async (datosUser) => {
  return await UsuarioData.create(datosUser);
};

const obtenerUsuarios = async () => {
  return await UsuarioData.find();
};

const obtenerUsuarioId = async (id) => {
  return await UsuarioData.findById(id);
};

const actualizarUsuarioID = async (id, datosUser) => {
  return await UsuarioData.findByIdAndUpdate(id, datosUser, {
    new: true,
  });
};

const ingresoUsuarioDNI = async (dni) => {
  return await UsuarioData.findOne({ dni });
};

const eliminarUsuarioID = async (id) => {
  return await UsuarioData.findByIdAndDelete(id);
};


const actualizarVencidos = async (hoy) => {
  return await UsuarioData.updateMany(
    { fechaVencimiento: { $lt: hoy }, estado: "activo" },
    { $set: { estado: "inactivo" } },
  );
};

export default {
  crearUsuario,
  obtenerUsuarios,
  obtenerUsuarioId,
  actualizarUsuarioID,
  ingresoUsuarioDNI,
  eliminarUsuarioID,
  actualizarVencidos,
};
