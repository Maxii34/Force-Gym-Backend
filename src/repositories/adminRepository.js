import Administrador from "../models/administrador";

const crearUserAdmin = async (dataUser) => {
  return await Administrador.create(dataUser);
};

const buscarEmail = async (email) => {
  return await Administrador.findOne({ email });
};

const buscarPorRol = async (rol) => {
  return await Administrador.findOne({ rol });
};

export default {
  crearUserAdmin,
  buscarEmail,
  buscarPorRol,
};