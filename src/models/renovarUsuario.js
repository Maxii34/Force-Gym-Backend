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
      unique: true,
      trim: true,
      validate: {
        validator: function (v) {
          return /^[0-9]+$/.test(v);
        },
        message: "El DNI solo debe contener números",
      },
    },
  },
  {
    timestamps: true, 
  }
);

const Renovacion = mongoose.model("Renovacion", renovacionSchema);

export default Renovacion;