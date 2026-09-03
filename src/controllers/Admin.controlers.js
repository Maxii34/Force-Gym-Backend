import adminServices from "../services/adminServices.js";

// Crear admin por unica vez
export const crearAdministrador = async (req, res) => {
  try {
    const nuevoAdministrador = await adminServices.crearUserAdmin(req.body);

    res.status(201).json({
      ok: true,
      mensaje: "Administrador creado exitosamente",
      usuario: {
        id: nuevoAdministrador._id,
        nombre: nuevoAdministrador.nombre,
        apellido: nuevoAdministrador.apellido,
        email: nuevoAdministrador.email,
        rol: nuevoAdministrador.rol,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      ok: false,
      mensaje: error.message,
    });
  }
};

export const iniciarSesion = async (req, res) => {
  try {
    const resultado = await adminServices.iniciar(req.body);

    res.status(200).json({
      ok: true,
      mensaje: "Inicio de sesión exitoso",
      usuario: resultado.usuario,
      token: resultado.token,
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      ok: false,
      mensaje: error.message,
    });
  }
};

export const cerrarSesion = (req, res) => {
  res.status(200).json({
    ok: true,
    mensaje: "Sesión cerrada exitosamente",
  });
};

export const editarAdministrador = async (req, res) => {
  try {
    const { id } = req.params;
    const adminActualizado = await adminServices.actualizarDatos(id, req.body);

    res.status(200).json({
      ok: true,
      mensaje: "Administrador actualizado exitosamente",
      usuario: {
        id: adminActualizado._id,
        nombre: adminActualizado.nombre,
        apellido: adminActualizado.apellido,
        email: adminActualizado.email,
        rol: adminActualizado.rol,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      ok: false,
      mensaje: "Error al editar el administrador",
    });
  }
};

export const listarAdministradores = async (req, res) => {
  try {
    const listarAdmin = await adminServices.ListarUsuarios();

    res.status(200).json({
      ok: true,
      mensaje: "Usuarios listados",
      usuarios: listarAdmin,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      ok: false,
      mensaje: "Error al listar los administradores",
    });
  }
};

export const deleteuserRol = async (req, res) => {
  try {
    const { id } = req.params;
    const usuarioEliminado = await adminServices.eliminarUsers(id);

    res.status(200).json({
      ok: true,
      mensaje: "Administrador eliminado exitosamente",
      usuario: usuarioEliminado,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      ok: false,
      mensaje: "Error al eliminar el administrador",
    });
  }
};

export const obtenerAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const obtener = await adminServices.obtenerUsuarioID(id);

    res.status(200).json({
      ok: true,
      mensaje: "Administrador obtenido",
      usuario: obtener,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      ok: false,
      mensaje: "Error al obtener el administrador",
    });
  }
};
