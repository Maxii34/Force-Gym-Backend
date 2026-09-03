import usuariosRepository from "../repositories/usuariosRepository.js";
import ingresosRepository from "../repositories/ingresosRepository.js";
import Membresia from "../models/membrecias.js";

const crearUsuario = async (datosUser) => {
  const { dni, nombre, apellido, membresia, telefono } = datosUser;

  if (
    !dni ||
    !nombre ||
    !apellido ||
    !membresia ||
    !telefono
  ) {
    throw new Error("Faltan datos obligatorios");
  }

  const usuarioExistente = await usuariosRepository.buscarUsuarioPorDNI(dni);
  if (usuarioExistente) {
    throw new Error("El usuario con este DNI ya existe");
  }

  const membresiaSeleccionada = await Membresia.findById(membresia);
  if (!membresiaSeleccionada || !membresiaSeleccionada.activa) {
    throw new Error("La membresía no es válida");
  }

  const fechaInicio = new Date();
  const fechaVencimiento = new Date(fechaInicio);
  fechaVencimiento.setDate(
    fechaVencimiento.getDate() + membresiaSeleccionada.duracionDias,
  );

  return await usuariosRepository.crearUsuario({
    dni,
    nombre,
    apellido,
    telefono,
    membresia,
    fechaInicio,
    fechaVencimiento,
    estado: "activo",
  });
};

const obtenerUsuarios = async () => {
  return await usuariosRepository.obtenerUsuarios();
};

const obtenerUsuarioID = async (id) => {
  const obtener = await usuariosRepository.obtenerUsuarioId(id);
  if (!obtener) {
    throw new Error("Usuario no encontrado");
  }
  return obtener;
};

const actualizarUsuarioID = async (id, datosUser) => {
  if (!datosUser || Object.keys(datosUser).length === 0) {
    throw new Error("Faltan datos obligatorios");
  }

  const usuarioExiste = await usuariosRepository.obtenerUsuarioId(id);
  if (!usuarioExiste) {
    throw new Error("Usuario no encontrado");
  }

  const {
    nombre,
    apellido,
    telefono,
    dni,
    pagoMensual,
    tipoMembresia,
    fechaVencimiento,
    estado,
  } = datosUser;

  const actualizado = await usuariosRepository.actualizarUsuarioID(id, {
    nombre: nombre || usuarioExiste.nombre,
    apellido: apellido || usuarioExiste.apellido,
    telefono: telefono || usuarioExiste.telefono,
    dni: dni || usuarioExiste.dni,
    pagoMensual: pagoMensual ?? usuarioExiste.pagoMensual,
    tipoMembresia: tipoMembresia || usuarioExiste.tipoMembresia,
    fechaVencimiento: fechaVencimiento || usuarioExiste.fechaVencimiento,
    estado: estado || usuarioExiste.estado,
  });

  return actualizado;
};


const eliminarUsuarioID = async (id) => {
  const usuario = /^[0-9]+$/.test(id)
    ? await usuariosRepository.eliminarUsuarioDNI(id)
    : await usuariosRepository.eliminarUsuarioID(id);
  if (!usuario) {
    throw new Error("Usuario no encontrado");
  }
  return usuario;
};

const desactivarUsuariosVencidos = async () => {
  const hoy = new Date();
  const resultado = await usuariosRepository.actualizarVencidos(hoy);
  return resultado.modifiedCount;
};

export default {
  crearUsuario,
  obtenerUsuarios,
  obtenerUsuarioID,
  actualizarUsuarioID,
  eliminarUsuarioID,
  desactivarUsuariosVencidos,
};
