import jwt from "jsonwebtoken";

export const validarToken = (req, res, next) => {
  try {
    const token = req.header("x-token");
    if (!token) {
      return res.status(401).json({ mensaje: "Token no proporcionado" });
    }
    const payload = jwt.verify(token, process.env.SECRETO_JWT);
    req.usuario = payload.id;
    next();
  } catch (error) {
    console.error(error);
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ mensaje: "El token ha expirado" });
    }
    return res.status(401).json({ mensaje: "Token inválido" });
  }
};
