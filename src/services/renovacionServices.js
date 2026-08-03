import usuariosRepository from "../repositories/usuariosRepository.js";
import renovacionesRepository from "../repositories/renovacionRepository.js";

const calcularVencimiento = (fechaBase, tipo) => {
  const nuevaFecha = new Date(fechaBase);

  switch (tipo) {
    case "mensual":
      nuevaFecha.setMonth(nuevaFecha.getMonth() + 1);
      return nuevaFecha;
    case "trimestral":
      nuevaFecha.setMonth(nuevaFecha.getMonth() + 3);
      return nuevaFecha;
    case "semestral":
      nuevaFecha.setMonth(nuevaFecha.getMonth() + 6);
      return nuevaFecha;
    case "anual":
      nuevaFecha.setFullYear(nuevaFecha.getFullYear() + 1);
      return nuevaFecha;
    default:
      return null;
  }
};

const renovarUsuario = async (datosRenovacion) => {
  const { dni, pagoMensual, tipoMembresia } = datosRenovacion;

  if (!dni || !pagoMensual || !tipoMembresia) {
    throw new Error("Faltan datos obligatorios (dni, pagoMensual, tipoMembresia)");
  }

  const usuario = await usuariosRepository.ingresoUsuarioDNI(dni);
  if (!usuario) {
    throw new Error("Usuario no encontrado con ese DNI");
  }

  const hoy = new Date();
  const vencimientoActual = new Date(usuario.fechaVencimiento);
  const fechaBaseCalculo = vencimientoActual < hoy ? hoy : vencimientoActual;

  const nuevaFechaVencimiento = calcularVencimiento(fechaBaseCalculo, tipoMembresia);

  if (!nuevaFechaVencimiento) {
    throw new Error("Tipo de membresía no válido");
  }

  await renovacionesRepository.crearRenovacion({
    dni: usuario.dni,
    pagoMensual,
    tipoMembresia,
    usuarioId: usuario._id,
    estado: "activo",
    fechaInicio: new Date(),
    fechaVencimiento: nuevaFechaVencimiento,
  });

  const usuarioRenovado = await usuariosRepository.actualizarUsuarioID(usuario._id, {
    pagoMensual,
    tipoMembresia,
    fechaVencimiento: nuevaFechaVencimiento,
    estado: "activo",
  });

  return {
    usuario: usuarioRenovado,
    vencimiento: nuevaFechaVencimiento,
  };
};

export default {
  renovarUsuario,
};