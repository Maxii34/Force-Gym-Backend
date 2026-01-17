import UsuarioData from "../models/usuarioDatos.js";

// Ingreso de usuarios
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
    console.error(error);
    res
      .status(500)
      .json({ mensaje: "Error al ingresar el usuario en el servidor" });
  }
};

// Crear nuevos usuarios
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
    console.error(error);
    res
      .status(500)
      .json({ mensaje: "Error al crear el usuario en el servidor" });
  }
};

export const listarUsuarios = async (req, res) => {
  try {
    const usuarios = await UsuarioData.find();
    res.status(200).json({ usuarios });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al listar los usuarios" });
  }
};

export const obtenerUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const octenerUsuario = await UsuarioData.findById(id);
    if (!octenerUsuario) {
      return res.status(404).json({ mensaje: "Usuario no encontrado" });
    }

    res.status(200).json({ mensaje: "Usuario encontrado", octenerUsuario });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al obtener los datos del usuario" });
  }
};

export const actualizarUsuario = async (req, res) => {
  try {
    const { id } = req.params;

    const { nombre, apellido, pago, tipoMembresia, telefono, dni } =
      req.body;

      if (!dni || !nombre || !apellido || !pago || !tipoMembresia || !telefono) {
        return res.status(400).json({ mensaje: "Faltan datos obligatorios" });
      }

    const usuarioActualizado = await UsuarioData.findByIdAndUpdate(
      id,
      { nombre, apellido, pago, tipoMembresia, telefono, dni },
      { new: true, runValidators: true }
    );

    if (!usuarioActualizado) {
      return res.status(404).json({ mensaje: "Usuario no encontrado" });
    }

    res.status(200).json({
      mensaje: "Usuario actualizado exitosamente",
      usuarioActualizado,
    });
  } catch (error) {
    console.error(error);

    if (error.code === 11000) {
      return res.status(400).json({
        mensaje: "El email o DNI ingresado ya pertenece a otro usuario.",
      });
    }

    // Si no es duplicado, lanzamos el error genérico
    res
      .status(500)
      .json({ mensaje: "Error al actualizar los datos del usuario" });
  }
};

export const eliminarUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const buscarusuario = await UsuarioData.findByIdAndDelete(id);
    if (!buscarusuario) {
      return res.status(404).json({ mensaje: "Usuario no encontrado" });
    }

    res.status(200).json({ mensaje: "Usuario eliminado exitosamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al eliminar el usuario" });
  }
};

