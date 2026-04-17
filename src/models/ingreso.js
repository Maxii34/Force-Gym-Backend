import mongoose, { Schema } from "mongoose";

const ingresoSchema = new Schema(
  {
    usuarioId: {
      type: Schema.Types.ObjectId,
      ref: "UsuarioData",
      required: true,
    },
    dni: {
      type: String,
      required: true,
    },
    fechaIngreso: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Ingreso", ingresoSchema);