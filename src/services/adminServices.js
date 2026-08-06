import { generarJWT } from "../middlewares/generarJWT.js";
import adminRepository from "../repositories/adminRepository.js";
import bcrypt from "bcrypt";

const crearUserAdmin = async (dataUser) => {
  const { nombre, apellido, email, password, rol } = dataUser;

  // Validar datos obligatorios
  if (!nombre || !apellido || !email || !password || !rol) {
    throw new Error(
      "Faltan datos obligatorios (nombre, apellido, email, password y rol).",
    );
  }

  // Validar email
  const emailExiste = await adminRepository.buscarEmail(email);

  if (emailExiste) {
    throw new Error("El email ya está registrado.");
  }

  // Validar roles únicos
  if (rol === "superadmin") {
    const existeElRol = await adminRepository.buscarPorRol(rol);

    if (existeElRol) {
      throw new Error(`Ya existe un ${rol} en el sistema.`);
    }
  }

  // Encriptar contraseña
  const saltos = await bcrypt.genSalt(10);
  const passwordEncriptada = await bcrypt.hash(password, saltos);

  // Crear administrador
  const nuevoAdministrador = await adminRepository.crearUserAdmin({
    nombre,
    apellido,
    email,
    password: passwordEncriptada,
    rol,
  });

  return nuevoAdministrador;
};

const iniciar = async (dataUser) => {
  const { email, password } = dataUser;
  if (!email || !password) {
    throw new Error("Faltan datos obligatorios");
  }

  const userExiste = await adminRepository.buscarEmail(email);
  if (!userExiste) {
    throw new Error("El correo no corresponde a un usuario");
  }

  const passwordCorrecta = await bcrypt.compare(password, userExiste.password);
  if (!passwordCorrecta) {
    throw new Error("Contraseña incorrecta");
  }

  const crearToken = generarJWT(userExiste._id, userExiste.rol);
  const { password: passwordBD, ...usuario } = userExiste.toObject();

  return {
    usuario,
    token: crearToken,
  };
};

const actualizarDatos = async (id, dataUser) => {
  const { id } = id;
  const { nombre, apellido, email, password } = dataUser;
  if (!dataUser) {
    throw new Error("Faltan datos obligatorios ");
  }
  //Se busca el id del admin
  const adminExiste = await adminRepository.buscarPorID(id);
  if (!adminExiste) {
    throw new Error("Administrador no encontrado");
  }
  //actualiza los datos
  adminExiste.nombre = nombre || adminExiste.nombre;
  adminExiste.apellido = apellido || adminExiste.apellido;
  adminExiste.email = email || adminExiste.email;

  if (password) {
    const saltos = await bcrypt.genSalt(10);
    adminExiste.password = await bcrypt.hash(password, saltos);
  }

  adminExiste.save();
  return adminExiste;
};

const ListarUsuarios = async () => {
  return await adminRepository.obtenerUsuarios();
};

export default {
  crearUserAdmin,
  iniciar,
  actualizarDatos,
  ListarUsuarios,
};
