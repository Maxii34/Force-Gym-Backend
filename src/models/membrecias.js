import mongoose from "mongoose";

const membresiaSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },

    descripcion: {
      type: String,
      trim: true,
      default: "",
    },

    precio: {
      type: Number,
      required: true,
      min: 0,
    },

    duracionDias: {
      type: Number,
      required: true,
      min: 1,
      default: 30,
    },

    beneficios: [
      {
        type: String,
        trim: true,
      },
    ],

    incluyeRutinas: {
      type: Boolean,
      default: false,
    },

    incluyeEntrenador: {
      type: Boolean,
      default: false,
    },

    activa: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
);

const Membresia = mongoose.model("Membresia", membresiaSchema);

export default Membresia;
