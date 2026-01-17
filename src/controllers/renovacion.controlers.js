import Renovacion from "../models/renovarUsuario.js";
import UsuarioData from "../models/usuarioDatos.js";


const calcularVencimiento = (fechaBase, tipo) => {
  const nuevaFecha = new Date(fechaBase);

  switch (tipo) {
    case "mensual":
      nuevaFecha.setMonth(nuevaFecha.getMonth() + 1);
      return nuevaFecha;
    case "trimestral":
      nuevaFecha.setMonth(nuevaFecha.getMonth() + 3);
      return nuevaFecha;
    case "semestral":
      nuevaFecha.setMonth(nuevaFecha.getMonth() + 6);
      return nuevaFecha;
    case "anual":
      nuevaFecha.setFullYear(nuevaFecha.getFullYear() + 1);
      return nuevaFecha;
    default:
      return null;
  }
};

export const renovarUsuario = async (req, res) => {
  try {
    const { dni, pago, tipoMembresia } = req.body;

    if (!dni || !pago || !tipoMembresia) {
      return res.status(400).json({
        mensaje: "Faltan datos obligatorios (dni, pago, tipoMembresia)",
      });
    }

    // se buscar el usuario por el dni
    const usuario = await UsuarioData.findOne({ dni });
    if (!usuario) {
      return res.status(404).json({ mensaje: "Usuario no encontrado con ese DNI" });
    }

    //Determinar fecha base (si ya venció, renovamos desde hoy. Si no, sumamos al vencimiento actual)
    const hoy = new Date();
    const vencimientoActual = new Date(usuario.fechaVencimiento);
    
    // Si vencimientoActual es menor a hoy, usa hoy. Si no, usa vencimientoActual.
    const fechaBaseCalculo = vencimientoActual < hoy ? hoy : vencimientoActual;

    //Calcular nueva fecha usando la función externa
    const nuevaFechaVencimiento = calcularVencimiento(fechaBaseCalculo, tipoMembresia);

    // Validamos si la función devolvió null (tipo incorrecto)
    if (!nuevaFechaVencimiento) {
      return res.status(400).json({ mensaje: "Tipo de membresía no válido" });
    }

    //Crear y Guardar la Renovación 
    const nuevaRenovacion = new Renovacion({
      dni: usuario.dni,
      pago: pago,
      tipoMembresia: tipoMembresia,
      usuarioId: usuario._id,
      estado: "activo",
      fechaInicio: new Date(),
      fechaVencimiento: nuevaFechaVencimiento,
    });

    await nuevaRenovacion.save();

    //Actualizar al Usuario
    const usuarioRenovado = await UsuarioData.findByIdAndUpdate(
      usuario._id,
      {
        pago,
        tipoMembresia,
        fechaVencimiento: nuevaFechaVencimiento,
        estado: "activo",
      },
      { new: true, runValidators: true }
    );

    res.status(200).json({
      mensaje: "Usuario renovado exitosamente",
      usuario: usuarioRenovado,
      vencimiento: nuevaFechaVencimiento,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al renovar el usuario" });
  }
};
