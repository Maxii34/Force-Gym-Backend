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
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      match: [
        /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
        "Por favor ingrese un email válido",
      ],
    },
    telefono: {
      type: String,
      required: true,
      trim: true,
      match: [/^\+?[0-9\s-]{7,15}$/, "El teléfono no es válido"],
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
    pago: {
      type: Number,
      required: true,
      min: 0, 
    },
    estado: {
      type: String,
      enum: ['activo', 'inactivo', 'suspendido'],
      default: 'activo'
    },
    fechaInicio: {
      type: Date,
      default: Date.now
    },
    fechaVencimiento: {
      type: Date,
      required: true
    },
    tipoMembresia: {
      type: String,
      enum: ['mensual', 'trimestral', 'semestral', 'anual'],
      required: true
    }
  },
  {
    timestamps: true,
  }
);

// Índice para consultas frecuentes por DNI
usuarioSchema.index({ dni: 1 });

const UsuarioData = mongoose.model("UsuarioData", usuarioSchema);

export default UsuarioData;