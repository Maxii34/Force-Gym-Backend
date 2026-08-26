import membresiaRepository from "../repositories/membreciaRepocitory.js";

const crearMembresia = async (membresiaData) => {
  const { nombre, precio, duracion } = membresiaData;
  if (!nombre || !precio || !duracion) {
    throw new Error("Faltan datos obligatorios (nombre, precio, duracion)");
  }
  return await membresiaRepository.createMembresia(membresiaData);
};

const obtenerMembresias = async () => {
  return await membresiaRepository.obtenerMembresias();
};

const obtenerMembreciaID = async (id) => {
  const obtenerID = await membresiaRepository.obtenerMembresiaPorId(id);
  if (!obtenerID) {
    throw new Error("Menbrecia no encontrada");
  }
  return obtenerID;
};

const actualizarMembresiaID = async (id, membresiaData) => {
  if (!membresiaData || Object.keys(membresiaData).length === 0) {
    throw new Error("Faltan datos obligatorios");
  }
  const membresiaActualizada = await membresiaRepository.actualizarMembresia(
    id,
    membresiaData,
  );
  if (!membresiaActualizada) {
    throw new Error("Menbrecia no encontrada");
  }
  return membresiaActualizada;
};

const eliminarMembresiaID = async (id) => {
  const membresiaEliminada = await membresiaRepository.eliminarMembresia(id);
  if (!membresiaEliminada) {
    throw new Error("Menbrecia no encontrada");
  }
  return membresiaEliminada;
};

const obtenerMembreciasActivas = async () => {
  return await membresiaRepository.obtenerMembresiasActivas();
};

const contarMembresias = async () => {
  return await membresiaRepository.contarMembresias();
}

const contarMembresiasActivas = async () => {
  return await membresiaRepository.contarMembresiasActivas();
}

const contarMembresiasInactivas = async () => {
  return await membresiaRepository.contarMembresiasInactivas();
}

export default {
  crearMembresia,
  obtenerMembresias,
  obtenerMembreciaID,
  actualizarMembresiaID,
  eliminarMembresiaID,
  obtenerMembreciasActivas,
  contarMembresias,
  contarMembresiasActivas,
  contarMembresiasInactivas,
};
