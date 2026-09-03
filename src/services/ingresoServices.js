import usuariosRepository from "../repositories/usuariosRepository.js";
import ingresoRepository from "../repositories/ingresoRepository.js";

const registrarIngreso = async (dni) => {
  if (!dni) {
    throw new Error("El DNI es obligatorio");
  }

  const usuarioExistente = await usuariosRepository.buscarUsuarioPorDNI(dni);

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

  const yaIngresoHoy = await ingresoRepository.buscarIngresoHoy(
    usuarioExistente._id,
    inicioDelDia,
  );

  let ingresoGuardado = null;

  if (!yaIngresoHoy) {
    ingresoGuardado = await ingresoRepository.crearIngreso(
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

const obtenerIngresosHoy = async () => {
  const inicioDelDia = new Date();
  inicioDelDia.setHours(0, 0, 0, 0);

  const finDelDia = new Date();
  finDelDia.setHours(23, 59, 59, 999);

  const total = await ingresoRepository.contarIngresosHoy(
    inicioDelDia,
    finDelDia,
  );

  return {
    fecha: inicioDelDia,
    total,
  };
};

const obtenerDetalleIngresosHoy = async () => {
  const inicioDelDia = new Date();
  inicioDelDia.setHours(0, 0, 0, 0);
  const finDelDia = new Date();
  finDelDia.setHours(23, 59, 59, 999);

  return await ingresoRepository.obtenerIngresosHoy(inicioDelDia, finDelDia);
};

export default {
  registrarIngreso,
  obtenerIngresosHoy,
  obtenerDetalleIngresosHoy,
};
