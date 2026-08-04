import usuariosServices from "../services/usuariosServices.js";

export const ingresoUsuarios = async (req, res) => {
  try {
    const { dni } = req.body;
    const resultado = await usuariosServices.ingresoUsuarioDNI(dni);

    return res.status(200).json({
      acceso: true,
      ...resultado,
    });
  } catch (error) {
    console.error(error);

    if (error.message === "El DNI es obligatorio") {
      return res.status(400).json({ mensaje: error.message });
    }
    if (error.message === "El usuario con este DNI no existe") {
      return res.status(404).json({ mensaje: error.message });
    }
    if (error.message === "Membresía expirada") {
      return res.status(403).json({
        acceso: false,
        mensaje:
          "Membresía expirada. Por favor, renueve su membresía para ingresar.",
        estado: "inactivo",
      });
    }
    if (error.message === "El usuario no está activo") {
      return res.status(403).json({ acceso: false, mensaje: error.message });
    }

    res
      .status(500)
      .json({ mensaje: "Error al ingresar el usuario en el servidor" });
  }
};

export const crearUsuarios = async (req, res) => {
  try {
    const nuevoUsuario = await usuariosServices.crearUsuario(req.body);
    res
      .status(201)
      .json({ mensaje: "Usuario creado exitosamente", nuevoUsuario });
  } catch (error) {
    console.error(error);

    if (
      error.message === "Faltan datos obligatorios" ||
      error.message === "El usuario con este DNI ya existe" ||
      error.message === "Tipo de membresía no válido"
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
    const usuarios = await usuariosServices.obtenerUsuarios();
    res.status(200).json({ usuarios });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al listar los usuarios" });
  }
};

export const obtenerUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const usuarioEncontrado = await usuariosServices.obtenerUsuarioID(id);
    res.status(200).json({ mensaje: "Usuario encontrado", usuarioEncontrado });
  } catch (error) {
    console.error(error);

    if (error.message === "Usuario no encontrado") {
      return res.status(404).json({ mensaje: error.message });
    }

    res.status(500).json({ mensaje: "Error al obtener los datos del usuario" });
  }
};

export const actualizarUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const usuarioActualizado = await usuariosServices.actualizarUsuarioID(
      id,
      req.body,
    );

    res.status(200).json({
      mensaje: "Usuario actualizado exitosamente",
      usuarioActualizado,
    });
  } catch (error) {
    console.error(error);

    if (error.message === "Faltan datos obligatorios") {
      return res.status(400).json({ mensaje: error.message });
    }
    if (error.message === "Usuario no encontrado") {
      return res.status(404).json({ mensaje: error.message });
    }
    if (error.code === 11000) {
      return res.status(400).json({
        mensaje: "El email o DNI ingresado ya pertenece a otro usuario.",
      });
    }

    res
      .status(500)
      .json({ mensaje: "Error al actualizar los datos del usuario" });
  }
};

export const eliminarUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    await usuariosServices.eliminarUsuarioID(id);
    res.status(200).json({ mensaje: "Usuario eliminado exitosamente" });
  } catch (error) {
    console.error(error);

    if (error.message === "Usuario no encontrado") {
      return res.status(404).json({ mensaje: error.message });
    }

    res.status(500).json({ mensaje: "Error al eliminar el usuario" });
  }
};

export const verificarVencimientos = async (req, res) => {
  try {
    const cantidadDesactivados =
      await usuariosServices.desactivarUsuariosVencidos();
    res.status(200)
      .json({
        mensaje: "Verificación de vencimientos ejecutada",
        usuariosDesactivados: cantidadDesactivados,
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error Al verificar vencimientos" });
  }
};
