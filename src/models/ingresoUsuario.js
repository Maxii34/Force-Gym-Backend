import mongoose, { Schema } from "mongoose";

const ingresoSchema = new Schema({
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
    fecha: {
      type: Date,
      default: Date.now,
    },
})

const Ingreso = mongoose.model("Ingreso", ingresoSchema);

export default Ingreso;