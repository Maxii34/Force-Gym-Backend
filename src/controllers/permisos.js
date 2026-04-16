export const permitirRoles = (rolesPermitidos) => {
  return (req, res, next) => {
    // El rol viene del payload que decodificamos en validarToken
    if (!req.rol || !rolesPermitidos.includes(req.rol)) {
      return res.status(403).json({ 
        mensaje: "No tienes permisos suficientes para realizar esta acción." 
      });
    }
    next();
  };
};