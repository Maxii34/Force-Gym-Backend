import { generarJWT } from "../middlewares/generarJWT";
import Administrador from "../models/administrador";
import bcrypt from "bcrypt";

// Crear admin por unica vez
export const crearAdministrador = async (req, res) => {
  try {
    const { nombre, apellido, email, password } = req.body;
    // Validar datos obligatorios
    if (!nombre || !apellido || !email || !password) {
      return res.status(400).json({ mensaje: "Faltan datos obligatorios" });
    }

    // Verificar si ya existe un administrador
    const adminExistente = await Administrador.findOne({ rol: "admin" });
    if (adminExistente) {
      return res.status(400).json({
        mensaje:
          "El sistema ya tiene un administrador. No se puede crear otro.",
      });
    }

    // Encriptar la contraseña
    const saltos = await bcrypt.genSalt(10);
    const passwordEncriptada = await bcrypt.hash(req.body.password, saltos);

    // Crear el nuevo administrador
    const nuevoAdministrador = new Administrador({
      nombre,
      apellido,
      email,
      password: passwordEncriptada,
      rol: "admin",
    });
    // Guardar en la base de datos
    await nuevoAdministrador.save();

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
    res.status(500).json({ mensaje: "Error al crear el administrador" });
  }
};

export const iniciarSesion = async (req, res) => {
  try {
    const { nombre, apellido, email, password } = req.body;
    // Validar datos obligatorios
    if (!nombre || !apellido || !email || !password) {
      return res.status(400).json({ mensaje: "Faltan datos obligatorios" });
    }

    const adminExistente = await Administrador.findOne({ email });
    if (!adminExistente) {
      return res.status(404).json({ mensaje: "Administrador no encontrado" });
    }

    const passwordCorrecta = await bcrypt.compare(
      password,
      adminExistente.password
    );
    if (!passwordCorrecta) {
      return res.status(401).json({ mensaje: "Contraseña incorrecta" });
    }

    const token = generarJWT(adminExistente._id);
    res.status(200).json({
      mensaje: "Inicio de sesión exitoso",
      usuario: {
        id: adminExistente._id,
        nombre: adminExistente.nombre,
        apellido: adminExistente.apellido,
        email: adminExistente.email,
        rol: adminExistente.rol,
      },
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al iniciar sesión" });
  }
};
