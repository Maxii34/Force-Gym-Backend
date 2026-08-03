import UsuarioData from "../models/usuarioDatos.js";
import Ingreso from "../models/ingreso.js";
import usuarioService from "../services/usuarioService.js";

// Ingreso de usuarios
export const ingresoUsuarios = async (req, res) => {
  try {
    const { dni } = req.body;

    if (!dni) {
      return res.status(400).json({ mensaje: "El DNI es obligatorio" });
    }

    // 1. Buscar usuario
    const usuarioExistente = await UsuarioData.findOne({ dni });

    if (!usuarioExistente) {
      return res
        .status(404)
        .json({ mensaje: "El usuario con este DNI no existe" });
    }

    const fechaActual = new Date();
    const fechaVencimiento = new Date(usuarioExistente.fechaVencimiento);

    // 2. Validar vencimiento
    if (fechaActual > fechaVencimiento) {
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

    // 3. Validar estado
    if (usuarioExistente.estado !== "activo") {
      return res.status(403).json({
        acceso: false,
        mensaje: "El usuario no está activo",
      });
    }

    // 4. Evitar doble ingreso en el mismo día
    const inicioDelDia = new Date();
    inicioDelDia.setHours(0, 0, 0, 0);

    const yaIngresoHoy = await Ingreso.findOne({
      usuarioId: usuarioExistente._id,
      fechaIngreso: { $gte: inicioDelDia },
    });

    let ingresoGuardado = null;

    if (!yaIngresoHoy) {
      ingresoGuardado = await Ingreso.create({
        usuarioId: usuarioExistente._id,
        dni: usuarioExistente.dni,
      });
    }

    // 5. Respuesta
    return res.status(200).json({
      acceso: true,
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
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      mensaje: "Error al ingresar el usuario en el servidor",
      error: error.message,
    });
  }
};

// Crear nuevos usuarios
export const crearUsuarios = async (req, res) => {
  try {
    const nuevoUsuario = await usuarioService.crearUsuario(req.body);
    res
      .status(201)
      .json({ mensaje: "Usuario creado exitosamente", nuevoUsuario });
  } catch (error) {
    console.error(error);

    if (
      error.message === "Faltan datos obligatorios" ||
      error.message === "El usuario con este DNI ya existe"
    ) {
      return res.status(400).json({ mensaje: error.message });
    }

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

    const { nombre, apellido, pagoMensual, tipoMembresia, telefono, dni } =
      req.body;

    if (
      !dni ||
      !nombre ||
      !apellido ||
      !pagoMensual ||
      !tipoMembresia ||
      !telefono
    ) {
      return res.status(400).json({ mensaje: "Faltan datos obligatorios" });
    }

    const usuarioActualizado = await UsuarioData.findByIdAndUpdate(
      id,
      { nombre, apellido, pagoMensual, tipoMembresia, telefono, dni },
      { new: true, runValidators: true },
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
