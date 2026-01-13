import mongoose from "mongoose";

try {
  mongoose.connect(process.env.MONGO_DB).then(() => {
    console.log("Conexión a la base de datos establecida");
  });
} catch (error) {
  console.error("Error al conectarse a la base de datos:", error);
}
