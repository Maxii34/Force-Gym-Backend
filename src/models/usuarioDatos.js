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
      // Esta regex acepta números con o sin guiones, paréntesis o +
      match: [/^\+?[0-9\s-]{7,15}$/, "El teléfono no es válido"],
    },
    dni: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      // Evita que se guarde puntos o letras solo Numeros.
      validate: {
        validator: function (v) {
          return /^[0-9]+$/.test(v);
        },
        message: "El DNI solo debe contener números",
      },
    },
    fechaNacimiento: {
      type: Date,
      required: true,
      min: 1900,
      max: new Date().getFullYear(),
    },
  },
  {
    timestamps: true,
  }
);

const UsuarioData = mongoose.model("UsuarioData", usuarioSchema);

export default UsuarioData;
