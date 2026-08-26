import menbresiaRepository from "../repositories/membreciaRepocitory.js";

const crearMembresia = async (membresiaData) => {
  const { nombre, precio, duracion } = membresiaData;
  if (!nombre || !precio || !duracion) {
    throw new Error("Faltan datos obligatorios (nombre, precio, duracion)");
  }
  return await menbresiaRepository.createMembresia(membresiaData);
};

const obtenerMembresias = async () => {
  return await menbresiaRepository.obtenerMembresias();
};

const obtenerMembreciaID = async (id) => {
  const obtenerID = await menbresiaRepository.obtenerMembresiaPorId(id);
  if (!obtenerID) {
    throw new Error("Menbrecia no encontrada");
  }
  return obtenerID;
};

const actualizarMembresiaID = async (id, membresiaData) => {
  if (!membresiaData || Object.keys(membresiaData).length === 0) {
    throw new Error("Faltan datos obligatorios");
  }
  const membresiaActualizada = await menbresiaRepository.actualizarMembresia(
    id,
    membresiaData,
  );
  if (!membresiaActualizada) {
    throw new Error("Menbrecia no encontrada");
  }
  return membresiaActualizada;
};

const eliminarMembresiaID = async (id) => {
  const membresiaEliminada = await menbresiaRepository.eliminarMembresia(id);
  if (!membresiaEliminada) {
    throw new Error("Menbrecia no encontrada");
  }
  return membresiaEliminada;
};

const menbreciaActivas = async () => {
  return await menbresiaRepository.menbreciaActivas();
};

const obtenerMembreciasActivas = async () => {
  return await menbresiaRepository.menbreciaActivas();
};

const contarMembresias = async () => {
  return await menbresiaRepository.contarMembresias();
}

const contarMembresiasActivas = async () => {
  return await menbresiaRepository.contarMembresiasActivas();
}

const contarMembresiasInactivas = async () => {
  return await menbresiaRepository.contarMembresiasInactivas();
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
