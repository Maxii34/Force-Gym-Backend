import renovacionServices from "../services/renovacionServices.js";

export const renovarUsuario = async (req, res) => {
  try {
    const resultado = await renovacionServices.renovarUsuario(req.body);

    res.status(200).json({
      mensaje: "Usuario renovado exitosamente",
      usuario: resultado.usuario,
      vencimiento: resultado.vencimiento,
    });
  } catch (error) {
    console.error(error);

    if (
      error.message === "Faltan datos obligatorios (dni, pagoMensual, tipoMembresia)" ||
      error.message === "Tipo de membresía no válido"
    ) {
      return res.status(400).json({ mensaje: error.message });
    }

    if (error.message === "Usuario no encontrado con ese DNI") {
      return res.status(404).json({ mensaje: error.message });
    }

    res.status(500).json({ mensaje: "Error al renovar el usuario" });
  }
};