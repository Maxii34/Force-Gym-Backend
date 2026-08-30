import cron from "node-cron";
import usuariosServices from "../services/usuariosServices.js";

cron.schedule("0 0 * * *", async () => {
  try {
    console.log("⏰ Ejecutando tarea automática: Verificando vencimientos...");

    const cantidadDesactivados = await usuariosServices.desactivarUsuariosVencidos();

    console.log(`✅ Tarea completada. Usuarios desactivados: ${cantidadDesactivados}`);
  } catch (error) {
    console.error("❌ Error en la tarea de vencimientos:", error);
  }
});