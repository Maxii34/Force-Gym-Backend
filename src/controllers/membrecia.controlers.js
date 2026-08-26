import menbreciService from "../services/membreciaServices.js";

export const crearMembresia = async (req, res) => {
  try {
    const nuevaMembresia = await menbreciService.crearMembresia(req.body);
    res.status(201).json({
      ok: true,
      mensaje: "Membrecia creada",
      data: nuevaMembresia,
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      ok: false,
      mensaje: error.message,
    });
  }
};

export const obtenerMembrecia = async (req, res) => {
  try {
    const { id } = req.params;
    const obtenerMembrecia = await menbreciService.obtenerMembreciaID(id);
    res.status(200).json({
      ok: true,
      mensaje: "Membrecia obtenida",
      data: obtenerMembrecia,
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      mensaje: error.message,
    });
  }
};

export const obtenerMembrecias = async (req, res) => {
  try {
    const obtenerMembrecias = await menbreciService.obtenerMembrecias();
    res.status(200).json({
      ok: true,
      mensaje: "Membrecias obtenidas",
      data: obtenerMembrecias,
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      mensaje: error.message,
    });
  }
};

export const actualizarMembresia = async (req, res) => {
  try {
    const { id } = req.params;
    const membresiaActualizada = await menbreciService.actualizarMembresiaID(
      id,
      req.body,
    );
    res.status(200).json({
      ok: true,
      mensaje: "Membrecia actualizada",
      data: membresiaActualizada,
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      mensaje: error.message,
    });
  }
};

export const eliminarMembresia = async (req, res) => {
  try {
    const { id } = req.params;
    const membresiaEliminada = await menbreciService.eliminarMembresiaID(id);
    res.status(200).json({
      ok: true,
      mensaje: "Membrecia eliminada",
      data: membresiaEliminada,
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      mensaje: error.message,
    });
  }
};

export const obtenerMembreciasActivas = async (req, res) => {
  try {
    const membresiasActivas = await menbreciService.obtenerMembreciasActivas();
    res.status(200).json({
      ok: true,
      mensaje: "Membrecias activas obtenidas",
      data: membresiasActivas,
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      mensaje: error.message,
    });
  }
};

export const obtenerEstadisticasMembresias = async (req, res) => {
  try {
    const total = await menbreciService.contarMembresias();
    const activas = await menbreciService.contarMembresiasActivas();
    const inactivas = await menbreciService.contarMembresiasInactivas();

    res.status(200).json({
      ok: true,
      mensaje: "Estadísticas de membresías obtenidas",
      data: {
        total,
        activas,
        inactivas,
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
