import usuariosRepository from "../repositories/usuariosRepository.js";
import ingresosRepository from "../repositories/ingresosRepository.js";

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

  const usuarioExistente = await usuariosRepository.ingresoUsuarioDNI(dni);
  if (usuarioExistente) {
    throw new Error("El usuario con este DNI ya existe");
  }

  const fechaInicio = new Date();
  const fechaVencimiento = new Date(fechaInicio);

  if (tipoMembresia === "mensual") {
    fechaVencimiento.setMonth(fechaVencimiento.getMonth() + 1);
  } else if (tipoMembresia === "trimestral") {
    fechaVencimiento.setMonth(fechaVencimiento.getMonth() + 3);
  } else if (tipoMembresia === "semestral") {
    fechaVencimiento.setMonth(fechaVencimiento.getMonth() + 6);
  } else if (tipoMembresia === "anual") {
    fechaVencimiento.setFullYear(fechaVencimiento.getFullYear() + 1);
  } else {
    fechaVencimiento.setDate(fechaVencimiento.getDate() + 30);
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
  const { nombre, apellido, pagoMensual, tipoMembresia, telefono, dni } =
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

  const actualizado = await usuariosRepository.actualizarUsuarioID(id, {
    nombre,
    apellido,
    pagoMensual,
    tipoMembresia,
    telefono,
    dni,
  });

  if (!actualizado) {
    throw new Error("Usuario no encontrado");
  }

  return actualizado;
};

const ingresoUsuarioDNI = async (dni) => {
  if (!dni) {
    throw new Error("El DNI es obligatorio");
  }

  const usuarioExistente = await usuariosRepository.ingresoUsuarioDNI(dni);
  if (!usuarioExistente) {
    throw new Error("El usuario con este DNI no existe");
  }

  const fechaActual = new Date();
  const fechaVencimiento = new Date(usuarioExistente.fechaVencimiento);

  if (fechaActual > fechaVencimiento) {
    if (usuarioExistente.estado === "activo") {
      usuarioExistente.estado = "inactivo";
      await usuarioExistente.save();
    }
    throw new Error("Membresía expirada");
  }

  if (usuarioExistente.estado !== "activo") {
    throw new Error("El usuario no está activo");
  }

  const inicioDelDia = new Date();
  inicioDelDia.setHours(0, 0, 0, 0);

  const yaIngresoHoy = await ingresosRepository.buscarIngresoHoy(
    usuarioExistente._id,
    inicioDelDia,
  );

  let ingresoGuardado = null;
  if (!yaIngresoHoy) {
    ingresoGuardado = await ingresosRepository.crearIngreso(
      usuarioExistente._id,
      usuarioExistente.dni,
    );
  }

  return {
    mensaje: yaIngresoHoy
      ? "Ingreso ya registrado hoy"
      : "Bienvenido, ingreso registrado",
    usuario: {
      nombre: usuarioExistente.nombre,
      apellido: usuarioExistente.apellido,
      tipoMembresia: usuarioExistente.tipoMembresia,
      fechaVencimiento: usuarioExistente.fechaVencimiento,
    },
    ingreso: ingresoGuardado || yaIngresoHoy,
  };
};

const eliminarUsuarioID = async (id) => {
  const usuario = await usuariosRepository.eliminarUsuarioID(id);
  if (!usuario) {
    throw new Error("Usuario no encontrado");
  }
  return usuario;
};

export default {
  crearUsuario,
  obtenerUsuarios,
  obtenerUsuarioID,
  actualizarUsuarioID,
  ingresoUsuarioDNI,
  eliminarUsuarioID,
};
