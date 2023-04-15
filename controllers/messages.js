const Mensaje = require('../models/message');

const obtenerChat = async(req, res) => {
    const myUid = req.uid;
    const mensajeDe = req.params.de;

    res.json({
        ok: true,
        msg: 'Mensajes'
    })
}


module.exports = {
    obtenerChat
}