import jwt from 'jsonwebtoken';

export const generarJWT = (id, rol) => {
    try {
        const payload = { id, rol };
        const token = jwt.sign(payload, process.env.SECRETO_JWT, {
            expiresIn: '30m',
        });
        return token;
    } catch (error) {
        console.error(error);
        return null;
    }
};