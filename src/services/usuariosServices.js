import usuariosRepository from "../repositories/usuariosRepository";

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

  const nuevoUsuario = await usuariosRepository.crearUsuario({
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

  return nuevoUsuario;
};

export default { crearUsuario };
