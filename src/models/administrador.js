import mongoose, { Schema } from "mongoose";

const administradorSchema = new Schema(
    {
    nombre: {
      type: String,
      required: true,
      trim: true,
    },
    apellido: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true, 
      trim: true,
      lowercase: true, 
      validate: {
        validator: function (v) {
          return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v);
        },
        message: "Por favor ingresa un correo electrónico válido",
      },
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minLength: [8, "La contraseña debe tener al menos 8 caracteres"],
    },
    rol: {
      type: String,
      enum: ["admin", "superadmin", "moderador"],
      default: "admin",
    },
  },
  {
    timestamps: true,
  },
);
// Método para ocultar la contraseña al devolver datos del administrador
administradorSchema.methods.toJSON = function() {
  const administrador = this.toObject();
  delete administrador.password;
  return administrador;
};

const Administrador = mongoose.model('Administrador', administradorSchema);

export default Administrador;
