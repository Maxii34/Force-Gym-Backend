import ingresosService from "../services/ingresoServices.js";

export const registrarIngreso = async (req, res) => {
  try {
    const { dni } = req.body;

    const resultado = await ingresosService.registrarIngreso(dni);

    return res.status(200).json({
      ok: true,
      acceso: true,
      ...resultado,
    });
  } catch (error) {
    console.error(error);

    if (error.message === "El DNI es obligatorio") {
      return res.status(400).json({
        ok: false,
        mensaje: error.message,
      });
    }

    if (error.message === "El usuario con este DNI no existe") {
      return res.status(404).json({
        ok: false,
        mensaje: error.message,
      });
    }

    if (error.message === "Membresía expirada") {
      return res.status(403).json({
        ok: false,
        acceso: false,
        mensaje:
          "Membresía expirada. Por favor, renueve su membresía para ingresar.",
        estado: "inactivo",
      });
    }

    if (error.message === "El usuario no está activo") {
      return res.status(403).json({
        ok: false,
        acceso: false,
        mensaje: error.message,
      });
    }
    return res.status(500).json({
      ok: false,
      mensaje: "Error al registrar el ingreso",
    });
  }
};

export const obtenerIngresosHoy = async (req, res) => {
  try {
    const resultado = await ingresosService.obtenerIngresosHoy();
    res.status(200).json({
      ok: true,
      mensaje: "Ingresos del día obtenidos",
      data: resultado,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      ok: false,
      mensaje: "Error al obtener los ingresos del día",
    });
  }
};
