import usuariosServices from "../services/usuariosServices.js";

export const crearUsuarios = async (req, res) => {
  try {
    const usuario = await usuariosServices.crearUsuario(req.body);
    res.status(201).json({
      ok: true,
      mensaje: "Usuario creado exitosamente",
      usuario,
    });
  } catch (error) {
    console.error(error);

    if (
      error.message === "Faltan datos obligatorios" ||
      error.message === "El usuario con este DNI ya existe" ||
      error.message === "Tipo de membresía no válido"
    ) {
      return res.status(400).json({ ok: false, mensaje: error.message });
    }

    res.status(500).json({
      ok: false,
      mensaje: "Error al crear el usuario en el servidor",
    });
  }
};

export const listarUsuarios = async (req, res) => {
  try {
    const usuarios = await usuariosServices.obtenerUsuarios();
    res.status(200).json({
      ok: true,
      mensaje: "Usuarios listados",
      usuarios,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      ok: false,
      mensaje: "Error al listar los usuarios",
    });
  }
};

export const obtenerUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const usuario = await usuariosServices.obtenerUsuarioID(id);
    res.status(200).json({
      ok: true,
      mensaje: "Usuario encontrado",
      usuario,
    });
  } catch (error) {
    console.error(error);

    if (error.message === "Usuario no encontrado") {
      return res.status(404).json({ ok: false, mensaje: error.message });
    }

    res.status(500).json({
      ok: false,
      mensaje: "Error al obtener los datos del usuario",
    });
  }
};

export const actualizarUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const usuario = await usuariosServices.actualizarUsuarioID(id, req.body);

    res.status(200).json({
      ok: true,
      mensaje: "Usuario actualizado exitosamente",
      usuario,
    });
  } catch (error) {
    console.error(error);

    if (error.message === "Faltan datos obligatorios") {
      return res.status(400).json({ ok: false, mensaje: error.message });
    }
    if (error.message === "Usuario no encontrado") {
      return res.status(404).json({ ok: false, mensaje: error.message });
    }
    if (error.code === 11000) {
      return res.status(400).json({
        ok: false,
        mensaje: "El DNI ingresado ya pertenece a otro usuario.",
      });
    }

    res.status(500).json({
      ok: false,
      mensaje: "Error al actualizar los datos del usuario",
    });
  }
};

export const eliminarUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const usuario = await usuariosServices.eliminarUsuarioID(id);
    res.status(200).json({
      ok: true,
      mensaje: "Usuario eliminado exitosamente",
      usuario,
    });
  } catch (error) {
    console.error(error);

    if (error.message === "Usuario no encontrado") {
      return res.status(404).json({ ok: false, mensaje: error.message });
    }

    res.status(500).json({
      ok: false,
      mensaje: "Error al eliminar el usuario",
    });
  }
};

export const verificarVencimientos = async (req, res) => {
  try {
    const usuariosDesactivados =
      await usuariosServices.desactivarUsuariosVencidos();

    res.status(200).json({
      ok: true,
      mensaje: "Verificación de vencimientos ejecutada",
      usuariosDesactivados,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      ok: false,
      mensaje: "Error al verificar vencimientos",
    });
  }
};
