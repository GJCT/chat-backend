//Metodos de interacción
const Usuario = require('../models/usuario');
const Mensaje = require('../models/message');


const usuarioConectado = async(uid = '') => {
    
    const usuario = await Usuario.findById(uid);
    usuario.online = true;
    await usuario.save();
    return usuario;
}

const usuarioDesconectado = async(uid = '') => {
    
    const usuario = await Usuario.findById(uid);
    usuario.online = false;
    await usuario.save();
    return usuario;
}

const grabarMensaje = async(payload) => {
    /* configuracion del payload
        {
            de: '',
            para: '',
            mensaje: ''
        }
    */
    try {
        const mensaje = new Mensaje(payload);
        await mensaje.save();

        return true;
    } catch (error) {
        return false;
    }
}

module.exports = {
    usuarioConectado,
    usuarioDesconectado,
    grabarMensaje
}