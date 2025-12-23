import mongoose, { Schema } from "mongoose";

const renovacionSchema = new Schema(
  {
    pago: {
      type: Number,
      required: true,
      min: 0, 
    },
    fecha: {
      type: Date,
      default: Date.now, 
    },
    dni: {
      type: String,
      required: true,
      trim: true, 
      index: true, 
    },
  },
  {
    timestamps: true, 
  }
);

const Renovacion = mongoose.model("Renovacion", renovacionSchema);

export default Renovacion;