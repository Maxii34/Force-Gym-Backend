import adminRepository from "../repositories/adminRepository";
import bcrypt from "bcrypt";

const crearUserAdmin = async (dataUser) => {
  const { nombre, apellido, email, password, rol } = dataUser;

  // Validar datos obligatorios
  if (!nombre || !apellido || !email || !password || !rol) {
    throw new Error(
      "Faltan datos obligatorios (nombre, apellido, email, password y rol)."
    );
  }

  // Validar email
  const emailExiste = await adminRepository.buscarEmail(email);

  if (emailExiste) {
    throw new Error("El email ya está registrado.");
  }

  // Validar roles únicos
  if (rol === "superadmin" || rol === "admin") {
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

export default {
  crearUserAdmin,
};