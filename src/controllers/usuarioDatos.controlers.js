import UsuarioData from "../models/usuarioDatos.js";

export const ingresoUsuarios = async (req, res) => {
  try {
    const { dni } = req.body;

    const usuarioExistente = await UsuarioData.findOne({ dni });

    if (!usuarioExistente) {
      return res
        .status(404)
        .json({ mensaje: "El usuario con este DNI no existe" });
    }

    const fechaIngreso = new Date();
    const fechaVencimiento = new Date(usuarioExistente.fechaVencimiento);

    if (fechaIngreso > fechaVencimiento) {
      if (usuarioExistente.estado === "activo") {
        usuarioExistente.estado = "inactivo";
        await usuarioExistente.save();
      }
      return res.status(403).json({
        acceso: false,
        mensaje:
          "Membresía expirada. Por favor, renueve su membresía para ingresar.",
        estado: "inactivo",
      });
    }

    if (usuarioExistente.estado === "activo") {
      return res.status(200).json({
        acceso: true,
        usuario: usuarioExistente,
        mensaje: "Bienvenido, acceso permitido",
      });
    }
    return res
      .status(403)
      .json({ acceso: false, mensaje: "El usuario no está activo" });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ mensaje: "Error al ingresar el usuario en el servidor", error });
  }
};

export const crearUsuarios = async (req, res) => {
  try {
    const { dni, nombre, apellido, pago, tipoMembresia, telefono } = req.body;
    if (!dni || !nombre || !apellido || !pago || !tipoMembresia || !telefono) {
      return res.status(400).json({ mensaje: "Faltan datos obligatorios" });
    }
    const usuarioExistente = await UsuarioData.findOne({ dni });
    if (usuarioExistente) {
      return res
        .status(400)
        .json({ mensaje: "El usuario con este DNI ya existe" });
    }

    const fechaInicio = new Date();
    const fechaVencimiento = new Date(fechaInicio);

    // Sumamos meses/años según el plan
    if (tipoMembresia === "mensual") {
      fechaVencimiento.setMonth(fechaVencimiento.getMonth() + 1);
    } else if (tipoMembresia === "trimestral") {
      fechaVencimiento.setMonth(fechaVencimiento.getMonth() + 3);
    } else if (tipoMembresia === "semestral") {
      fechaVencimiento.setMonth(fechaVencimiento.getMonth() + 6);
    } else if (tipoMembresia === "anual") {
      fechaVencimiento.setFullYear(fechaVencimiento.getFullYear() + 1);
    } else {
      // Por defecto 30 días si hay error
      fechaVencimiento.setDate(fechaVencimiento.getDate() + 30);
    }

    const nuevoUsuario = new UsuarioData({
      dni,
      nombre,
      apellido,
      telefono,
      pago,
      tipoMembresia,
      fechaInicio,
      fechaVencimiento,
      estado: "activo",
    });
    await nuevoUsuario.save();

    res
      .status(201)
      .json({ mensaje: "Usuario creado exitosamente", nuevoUsuario });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ mensaje: "Error al crear el usuario en el servidor" });
  }
};
