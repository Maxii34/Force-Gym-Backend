import adminServices from "../services/adminServices.js";

// Crear admin por unica vez
export const crearAdministrador = async (req, res) => {
  try {
    const nuevoAdministrador = await adminServices.crearUserAdmin(req.body);

    res.status(201).json({
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
      mensaje: error.message,
    });
  }
};

export const iniciarSesion = async (req, res) => {
  try {
    const resultado = await adminServices.iniciar(req.body);

    res.status(200).json({
      mensaje: "Inicio de sesión exitoso",
      usuario: resultado.usuario,
      token: resultado.token,
    });
  } catch (error) {
    console.error(error);

    res.status(400).json({
      mensaje: error.message,
    });
  }
};

export const editarAdministrador = async (req, res) => {
  try {
    const { id } = req.params;
    const adminActualizado = await adminServices.actualizarDatos(id, req.body);

    res.status(200).json({
      mensaje: "Administrador actualizado exitosamente",
      usuario: {
        id: admin._id,
        nombre: admin.nombre,
        email: admin.email,
        rol: admin.rol,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al editar el administrador" });
  }
};

export const listarAdministradores = async (req, res) => {
  try {
    const listarAdmin = await Administrador.find().select("-password");
    res.status(200).json(listarAdmin);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al listar los administradores" });
  }
};

export const deleteuserRol = async (req, res) => {
  try {
    const { id } = req.params;
    const admin = await Administrador.findById(id);
    if (!admin) {
      return res.status(404).json({ mensaje: "Administrador no encontrado" });
    }

    // Verificar si se intenta eliminar un superadmin y si ya existe uno
    if (admin.rol === "superadmin") {
      const superadminExistente = await Administrador.findOne({
        rol: "superadmin",
      });
      if (superadminExistente) {
        return res.status(400).json({
          mensaje: "No se puede eliminar el unico superadmin, del sistema.",
        });
      }
    }

    await Administrador.findByIdAndDelete(id);
    res.status(200).json({ mensaje: "Administrador eliminado exitosamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al eliminar el administrador" });
  }
};

export const listarAdmin = async (req, res) => {
  try {
    const listarAdmin = await Administrador.find().select("-password");
    res.status(200).json(listarAdmin);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al listar los administradores" });
  }
};
