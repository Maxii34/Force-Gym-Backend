import mongoose, { Schema } from "mongoose";

const renovacionSchema = new Schema(
  {
    dni: {
      type: String,
      required: true,
      trim: true,
      validate: {
        validator: function (v) {
          return /^[0-9]+$/.test(v);
        },
        message: "El DNI solo debe contener números",
      },
    },
    pago: {
      type: Number,
      required: true,
      min: 0,
    },
    estado: {
      type: String,
      enum: ["activo", "inactivo", "suspendido"],
      default: "activo",
    },
        tipoMembresia: {
      type: String,
      enum: ['mensual', 'trimestral', 'semestral', 'anual'],
      default: 'mensual',
      required: true
    },
    fechaInicio: {
      type: Date,
      default: Date.now,
    },
    fechaVencimiento: {
      type: Date,
      required: true,
    },
    usuarioId: {
      type: Schema.Types.ObjectId,
      ref: "usuarioData",
      required: true,
    }
  },
  {
    timestamps: true,
  }
);

const Renovacion = mongoose.model("Renovacion", renovacionSchema);

export default Renovacion;
