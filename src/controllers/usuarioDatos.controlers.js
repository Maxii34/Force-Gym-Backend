import UsuarioData from "../models/usuarioDatos.js";
import Renovacion from "../models/renovarUsuario.js";

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
      .json({ mensaje: "Error al ingresar el usuario en el servidor", error });
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

    // Agregamos 'dni' y 'email' para permitir corregir errores de tipeo
    const { nombre, apellido, pago, tipoMembresia, telefono, dni } =
      req.body;

      if (!dni || !nombre || !apellido || !pago || !tipoMembresia || !telefono) {
        return res.status(400).json({ mensaje: "Faltan datos obligatorios" });
      }

    // Buscamos y actualizamos en un solo paso (más eficiente)
    const usuarioActualizado = await UsuarioData.findByIdAndUpdate(
      id,
      { nombre, apellido, pago, tipoMembresia, telefono, dni },
      { new: true, runValidators: true }
    );

    // Si no encuentra nada, devuelve null
    if (!usuarioActualizado) {
      return res.status(404).json({ mensaje: "Usuario no encontrado" });
    }

    res.status(200).json({
      mensaje: "Usuario actualizado exitosamente",
      usuarioActualizado,
    });
  } catch (error) {
    console.error(error);

    // CORRECCIÓN IMPORTANTE: Primero verificamos el error específico
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

export const renovarUsuario = async (req, res) => {
  try {
    // 1. Recibimos DNI y datos de pago
    const { dni, pago, tipoMembresia } = req.body;

    // Validación de datos obligatorios
    if (!dni || !pago || !tipoMembresia) {
      return res.status(400).json({ mensaje: "Faltan datos obligatorios (dni, pago, tipoMembresia)" });
    }

    // 2. Buscamos al usuario por DNI
    const usuario = await UsuarioData.findOne({ dni });
    
    if (!usuario) {
      return res.status(404).json({ mensaje: "Usuario no encontrado con ese DNI" });
    }

    // 3. LÓGICA DE FECHAS (INTELIGENTE)
    const hoy = new Date();
    const vencimientoActual = new Date(usuario.fechaVencimiento);
    
    // Si ya venció, sumamos desde HOY. Si le quedan días, sumamos a su Vencimiento.
    let fechaBaseCalculo = (vencimientoActual < hoy) ? hoy : vencimientoActual;
    
    // Calculamos la nueva fecha
    const nuevaFechaVencimiento = new Date(fechaBaseCalculo);

    switch (tipoMembresia) {
      case "mensual":
        nuevaFechaVencimiento.setMonth(nuevaFechaVencimiento.getMonth() + 1);
        break;
      case "trimestral":
        nuevaFechaVencimiento.setMonth(nuevaFechaVencimiento.getMonth() + 3);
        break;
      case "semestral":
        nuevaFechaVencimiento.setMonth(nuevaFechaVencimiento.getMonth() + 6);
        break;
      case "anual":
        nuevaFechaVencimiento.setFullYear(nuevaFechaVencimiento.getFullYear() + 1);
        break;
      default:
        return res.status(400).json({ mensaje: "Tipo de membresía no válido" });
    }
    try {
        const nuevaRenovacion = new Renovacion({
            dni: usuario.dni,
            pago: pago,
            tipoMembresia: tipoMembresia,
            estado: "activo",
            fechaInicio: new Date(),
            fechaVencimiento: nuevaFechaVencimiento
        });
        await nuevaRenovacion.save();
    } catch (historialError) {
        console.log("Error al guardar historial, pero seguimos con la renovación:", historialError);
    }

    const usuarioRenovado = await UsuarioData.findByIdAndUpdate(
      usuario._id, 
      {
        pago, 
        tipoMembresia,
        fechaVencimiento: nuevaFechaVencimiento,
        estado: true 
      },
      { new: true, runValidators: true }
    );

    res.status(200).json({
      mensaje: "Usuario renovado exitosamente",
      usuario: usuarioRenovado,
      vencimiento: nuevaFechaVencimiento
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al renovar el usuario" });
  }
};
