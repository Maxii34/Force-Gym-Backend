import renovacionServices from "../services/renovacionServices.js";

export const renovarUsuario = async (req, res) => {
  try {
    const resultado = await renovacionServices.renovarUsuario(req.body);

    res.status(200).json({
      ok: true,
      mensaje: "Usuario renovado exitosamente",
      usuario: resultado.usuario,
      renovacion: resultado.renovacion,
      vencimiento: resultado.vencimiento,
    });
  } catch (error) {
    console.error(error);

    if (
      error.message ===
        "Faltan datos obligatorios (dni, pagoMensual, tipoMembresia)" ||
      error.message === "Tipo de membresía no válido"
    ) {
      return res.status(400).json({ ok: false, mensaje: error.message });
    }

    if (error.message === "Usuario no encontrado con ese DNI") {
      return res.status(404).json({ ok: false, mensaje: error.message });
    }

    res.status(500).json({ ok: false, mensaje: "Error al renovar el usuario" });
  }
};

export const obtenerRenovacionesRecientes = async (req, res) => {
  try {
    const renovaciones = await renovacionServices.obtenerRenovacionesRecientes();
    res.status(200).json({ ok: true, data: renovaciones });
  } catch (error) {
    console.error(error);
    res.status(500).json({ ok: false, mensaje: "Error al obtener las renovaciones" });
  }
};
