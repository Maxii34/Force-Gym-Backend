import { generarJWT } from "../middlewares/generarJWT.js";
import Administrador from "../models/administrador.js";
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
      usuario: adminExistente,
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al iniciar sesión" });
  }
};

export const editarAdministrador = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, apellido, email, password } = req.body;

    // 1. Buscamos al admin por ID primero
    const admin = await Administrador.findById(id);
    if (!admin) {
      return res.status(404).json({ mensaje: "Administrador no encontrado" });
    }

    // 2. Actualizamos datos básicos si vienen en el body
    admin.nombre = nombre || admin.nombre;
    admin.apellido = apellido || admin.apellido;
    admin.email = email || admin.email;

    // Solo si el usuario envió algo en el campo password, se encripta 
    if (password) {
      const saltos = await bcrypt.genSalt(10);
      admin.password = await bcrypt.hash(password, saltos);
    }

    await admin.save();

    res.status(200).json({
      mensaje: "Administrador actualizado exitosamente",
      usuario: {
        id: admin._id,
        nombre: admin.nombre,
        email: admin.email,
        rol: admin.rol
      }
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al editar el administrador" });
  }
};