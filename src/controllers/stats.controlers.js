import UsuarioData from "../models/usuarioDatos.js";
import Renovacion from "../models/renovarUsuario.js";

export const obtenerDashboardGeneral = async (req, res) => {
  try {
    const hoy = new Date();
    const inicioMes = new Date(hoy.getFullYear(), hoy.getMonth(), 1);

    // Ejecutamos todas las consultas en paralelo para máxima velocidad
    const [sociosEstado, finanzas, planes] = await Promise.all([
      // 1. Conteo de Activos vs Inactivos
      UsuarioData.aggregate([
        { $group: { _id: "$estado", total: { $sum: 1 } } }
      ]),

      // 2. Ingresos del mes actual
      Renovacion.aggregate([
        { $match: { createdAt: { $gte: inicioMes } } },
        { $group: { _id: null, total: { $sum: "$pagoMensual" }, cantidad: { $sum: 1 } } }
      ]),

      // 3. Tipos de planes más vendidos
      UsuarioData.aggregate([
        { $group: { _id: "$tipoMembresia", total: { $sum: 1 } } }
      ])
    ]);

    res.status(200).json({
      mensaje: "Estadísticas generadas con éxito",
      data: {
        sociosPorEstado: sociosEstado,
        ingresosMesActual: finanzas[0] || { total: 0, cantidad: 0 },
        distribucionPlanes: planes
      }
    });
  } catch (error) {
    console.error("Error en stats:", error);
    res.status(500).json({ mensaje: "Error al procesar estadísticas" });
  }
};