import jwt from "jsonwebtoken";

export const validarToken = (req, res, next) => {
  try {
    // Buscar token en Authorization header (Bearer)
    const authHeader = req.header("Authorization");
    let token;
    
    if (authHeader && authHeader.startsWith("Bearer ")) {
      token = authHeader.slice(7); // Remover "Bearer " del inicio
    }
    
    if (!token) {
      return res.status(401).json({ mensaje: "Token no proporcionado" });
    }
    const payload = jwt.verify(token, process.env.SECRETO_JWT);
    req.usuario = payload.id;
    req.rol = payload.rol;
    next();
  } catch (error) {
    console.error(error);
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ mensaje: "El token ha expirado" });
    }
    return res.status(401).json({ mensaje: "Token inválido" });
  }
};
