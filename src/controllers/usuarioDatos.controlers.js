import UsuarioData from "../models/usuarioDatos";

export const ingresoUsuario = async (req, res) => {
    try {
        const nuevoUsuario = new UsuarioData(req.body)
        await nuevoUsuario.save()
        res.status(201).json(nuevoUsuario, { mensaje: 'Usuario ingresado correctamente' })
    } catch (error) {
        console.log(error)
        res.status(500).json({ mensaje: 'Error al ingresar el usuario en el servidor' })
    }
}