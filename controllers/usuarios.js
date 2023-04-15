const { response } = require('express');
const Usuario = require('../models/usuario');

const getUsuarios = async (req, res = response) => {

    const usuarios = await Usuario
          .find({ _id: {$ne: req.uid}})
          .sort('-online');
    //console.log(usuarios);

    res.json({
        ok: true,
        //msg: 'getUsuarios',
        usuarios
    });
}

module.exports = {
    getUsuarios
}