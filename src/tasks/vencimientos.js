import cron from "node-cron";
import UsuarioData from "../models/usuarioDatos.js";

// Se ejecuta todos los días a las 00:00 (medianoche)
cron.schedule("0 0 * * *", async () => {
  try {
    console.log("⏰ Ejecutando tarea automática: Verificando vencimientos...");

    const hoy = new Date();

    // Buscamos usuarios activos cuya fecha de vencimiento ya pasó
    const resultado = await UsuarioData.updateMany(
      {
        fechaVencimiento: { $lt: hoy },
        estado: "activo",
      },
      {
        $set: { estado: "inactivo" },
      },
    );

    console.log(
      `✅ Tarea completada. Usuarios desactivados: ${resultado.modifiedCount}`,
    );
  } catch (error) {
    console.error("❌ Error en la tarea de vencimientos:", error);
  }
});
