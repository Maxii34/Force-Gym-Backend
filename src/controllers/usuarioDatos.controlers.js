import usuarioDatos from "../models/usuarioDatos.js";

export const ingresoUsuarios = async (req, res) => {
    try {
        const { dni } = req.body
        // verifica si el dni ingresado esiste en en listema
        const usuarioExistente = await usuarioDatos.findOne({ dni });
        if(!usuarioExistente) {
            return res.status(400).json({ mensaje: 'El usuario con este DNI ya existe' })
        }

        const nuevoUsuario = new usuarioDatos(req.body)
        await nuevoUsuario.save()
        res.status(201).json(nuevoUsuario, { mensaje: 'Usuario registrado correctamente' })
    } catch (error) {
        console.log(error)
        res.status(500).json({ mensaje: 'Error al ingresar el usuario en el servidor' })
    }
}

export const crearUsuarioDatos = async (req, res) => {
    try {
        
    } catch (error) {
        console.log(error)
        res.status(500).json({ mensaje: 'Error al crear el usuario en el servidor' })
    }
};