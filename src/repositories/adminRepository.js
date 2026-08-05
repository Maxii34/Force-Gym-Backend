import Administrador from "../models/administrador.js";

const crearUserAdmin = async (dataUser) => {
  return await Administrador.create(dataUser);
};

const buscarEmail = async (email) => {
  return await Administrador.findOne({ email });
};

const buscarPorRol = async (rol) => {
  return await Administrador.findOne({ rol });
};

const buscarPorID = async (id) => {
  return await Administrador.findById(id);
};

export default {
  crearUserAdmin,
  buscarEmail,
  buscarPorRol,
  buscarPorID,
};
