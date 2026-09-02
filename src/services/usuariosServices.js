import usuariosRepository from "../repositories/usuariosRepository.js";
import ingresosRepository from "../repositories/ingresosRepository.js";
import calcularFechaVencimiento from "../utils/calcularFechaVencimiento.js";

const crearUsuario = async (datosUser) => {
  const { dni, nombre, apellido, pagoMensual, tipoMembresia, telefono } =
    datosUser;

  if (
    !dni ||
    !nombre ||
    !apellido ||
    !pagoMensual ||
    !tipoMembresia ||
    !telefono
  ) {
    throw new Error("Faltan datos obligatorios");
  }

  const usuarioExistente = await usuariosRepository.buscarUsuarioPorDNI(dni);
  if (usuarioExistente) {
    throw new Error("El usuario con este DNI ya existe");
  }

  const fechaInicio = new Date();
  const fechaVencimiento = calcularFechaVencimiento(fechaInicio, tipoMembresia);

  if (!fechaVencimiento) {
    throw new Error("Tipo de membresía no válido");
  }

  return await usuariosRepository.crearUsuario({
    dni,
    nombre,
    apellido,
    telefono,
    pagoMensual,
    tipoMembresia,
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
