import { generarJWT } from "../middlewares/generarJWT.js";
import adminRepository from "../repositories/adminRepository.js";
import bcrypt from "bcrypt";

const crearUserAdmin = async (dataUser) => {
  const { nombre, apellido, email, password, rol } = dataUser;

  if (!nombre || !apellido || !email || !password || !rol) {
    throw new Error(
      "Faltan datos obligatorios (nombre, apellido, email, password y rol).",
    );
  }

  const emailExiste = await adminRepository.buscarEmail(email);
  if (emailExiste) {
    throw new Error("El email ya está registrado.");
  }

  if (rol === "superadmin") {
    const existeElRol = await adminRepository.buscarPorRol(rol);
    if (existeElRol) {
      throw new Error(`Ya existe un ${rol} en el sistema.`);
    }
  }

  const saltos = await bcrypt.genSalt(10);
  const passwordEncriptada = await bcrypt.hash(password, saltos);

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
  const { nombre, apellido, email, password } = dataUser;
  if (!dataUser) {
    throw new Error("Faltan datos obligatorios");
  }

  const adminExiste = await adminRepository.buscarPorID(id);
  if (!adminExiste) {
    throw new Error("Administrador no encontrado");
  }

  adminExiste.nombre = nombre || adminExiste.nombre;
  adminExiste.apellido = apellido || adminExiste.apellido;
  adminExiste.email = email || adminExiste.email;

  if (password) {
    const saltos = await bcrypt.genSalt(10);
    adminExiste.password = await bcrypt.hash(password, saltos);
  }

  await adminExiste.save(); // ⚠️ le agregué el "await" que faltaba (ver nota abajo)
  return adminExiste;
};

const ListarUsuarios = async () => {
  return await adminRepository.obtenerUsuarios();
};

const obtenerUsuarioID = async (id) => {
  return await adminRepository.buscarPorID(id);
};

const eliminarUsers = async (id) => {
  const buscarUser = await adminRepository.buscarPorID(id);

  if (!buscarUser) {
    throw new Error("Usuario no encontrado");
  }

  if (buscarUser.rol === "superadmin") {
    const cantidadSuperAdmin = await adminRepository.contarPorRol("superadmin");

    if (cantidadSuperAdmin <= 1) {
      throw new Error(
        "No es posible eliminar el único SuperAdmin del sistema.",
      );
    }
  }

  return await adminRepository.eliminarUser(id); // ✅ ahora sí devuelve el usuario eliminado
};

export default {
  crearUserAdmin,
  iniciar,
  actualizarDatos,
  ListarUsuarios,
  eliminarUsers,
  obtenerUsuarioID,
};
