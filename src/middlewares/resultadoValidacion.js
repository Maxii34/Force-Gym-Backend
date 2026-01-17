import { vallidationResult } from "express-validator";

const resultadoValidacion = (req, res, next) => {
    const errors = vallidationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

export default resultadoValidacion;