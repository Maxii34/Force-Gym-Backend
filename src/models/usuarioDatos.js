import mongoose, { Schema } from "mongoose";

const usuarioSchema = new Schema(
  {
    nombre: {
      type: String,
      required: true,
      trim: true,
      minLength: 2,
      maxLength: 50,
    },
    apellido: {
      type: String,
      required: true,
      trim: true,
      minLength: 2,
      maxLength: 50,
    },
    telefono: {
      optional: true,
      type: String,
      trim: true,
      match: [/^\+?[0-9\s-]{7,15}$/, "El teléfono no es válido"],
    },
    email: {
      optional: true,
      type: String,
      sparse: true,
      trim: true,
      lowercase: true,
      validate: {
        validator: function (v) {
          return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v);
        },
        message: "El email no es válido",
      },
    },

    dni: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      immutable: true,
      validate: {
        validator: function (v) {
          return /^[0-9]+$/.test(v);
        },
        message: "El DNI solo debe contener números",
      },
    },
    estado: {
      type: String,
      enum: ["activo", "inactivo", "suspendido"],
      default: "activo",
    },
    fechaInicio: {
      type: Date,
      default: Date.now,
    },
    fechaVencimiento: {
      type: Date,
      required: true,
    },
    membresia: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Membresia",
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const UsuarioData = mongoose.model("UsuarioData", usuarioSchema);

export default UsuarioData;
