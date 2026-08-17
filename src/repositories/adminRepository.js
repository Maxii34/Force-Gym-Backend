import Administrador from "../models/administrador.js";

//Crea el usuario
const crearUserAdmin = async (dataUser) => {
  return await Administrador.create(dataUser);
};
//Busca por email
const buscarEmail = async (email) => {
  return await Administrador.findOne({ email });
};
//Busca por rol
const buscarPorRol = async (rol) => {
  return await Administrador.findOne({ rol });
};
//Cuenta por rol
const contarPorRol = async (rol) => {
  return await Administrador.countDocuments({ rol });
};
//Busca por id
const buscarPorID = async (id) => {
  return await Administrador.findById(id).select("-password");
};
//busca todos y no devuelve campo password
const obtenerUsuarios = async () => {
  return await Administrador.find().select("-password");
};
//Busca y elimina
const eliminarUser = async (id) => {
  return await Administrador.findByIdAndDelete(id)
};

export default {
  crearUserAdmin,
  buscarEmail,
  buscarPorRol,
  buscarPorID,
  obtenerUsuarios,
  eliminarUser,
  contarPorRol,
};
