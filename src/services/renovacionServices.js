import usuariosRepository from "../repositories/usuariosRepository.js";
import renovacionesRepository from "../repositories/renovacionRepository.js";
import calcularFechaVencimiento from "../utils/calcularFechaVencimiento.js";
import Membresia from "../models/membrecias.js";

const renovarUsuario = async (datosRenovacion) => {
  const { dni, membresia, pagoMensual, tipoMembresia } = datosRenovacion;

  if (!dni || !membresia || !pagoMensual || !tipoMembresia) {
    throw new Error(
      "Faltan datos obligatorios (dni, membresia, pagoMensual, tipoMembresia)",
    );
  }

  const membresiaSeleccionada = await Membresia.findById(membresia);
  if (!membresiaSeleccionada || !membresiaSeleccionada.activa) {
    throw new Error("La membresía no es válida");
  }

  const usuario = await usuariosRepository.buscarUsuarioPorDNI(dni);
  if (!usuario) {
    throw new Error("Usuario no encontrado con ese DNI");
  }

  const hoy = new Date();
  const vencimientoActual = new Date(usuario.fechaVencimiento);
  const fechaBaseCalculo = vencimientoActual < hoy ? hoy : vencimientoActual;

  const nuevaFechaVencimiento = calcularFechaVencimiento(
    fechaBaseCalculo,
    tipoMembresia,
  );
  if (!nuevaFechaVencimiento) {
    throw new Error("Tipo de membresía no válido");
  }

  const renovacionCreada = await renovacionesRepository.crearRenovacion({
    dni: usuario.dni,
    pagoMensual,
    tipoMembresia,
    usuarioId: usuario._id,
    estado: "activo",
    fechaInicio: new Date(),
    fechaVencimiento: nuevaFechaVencimiento,
  });

  const usuarioRenovado = await usuariosRepository.actualizarUsuarioID(
    usuario._id,
    {
      membresia,
      fechaVencimiento: nuevaFechaVencimiento,
      estado: "activo",
    },
  );

  return {
    usuario: usuarioRenovado,
    renovacion: renovacionCreada,
    vencimiento: nuevaFechaVencimiento,
  };
};

const obtenerRenovacionesRecientes = async () => {
  return await renovacionesRepository.obtenerRenovacionesRecientes();
};

export default {
  renovarUsuario,
  obtenerRenovacionesRecientes,
};
