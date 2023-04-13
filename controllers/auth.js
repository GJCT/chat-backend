const { response, json } = require('express');
//const { validationResult } = require("express-validator");
const bcrypt = require('bcryptjs');

const Usuario = require('../models/usuario');
const { generarToken } = require('../helpers/jwt');
const usuario = require('../models/usuario');


const crearUsuario = async (req, res = response) => {

    const { correo, password, password2 } = req.body;
    try {

        const correoExistente = await Usuario.findOne({correo});
        if(correoExistente){
            return res.status(400).json({
                ok: false,
                msg: 'Valide las credenciales'
            });
        }

        const usuario = new Usuario(req.body);

        //Encriptar la contraseña
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync( password, salt);
        usuario.password2 = bcrypt.hashSync(password2, salt);

        await usuario.save();

        //Generar el token
        const token = await generarToken(usuario.id);

        res.json({
            ok: true,
            masg: 'Usuario creado',
            usuario,
            token
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            masg: 'Hable con el administrador'
        });
        throw new Error('Comuniquese con el Admi');
    }
};

const loginUsuario = async(req, res = response) => {

    const { correo, password } = req.body;

    try {

        //Validar Correo
        const correoExistente = await Usuario.findOne({correo});
        if(!correoExistente){
            return res.status(404).json({
                ok: false,
                msg: 'Valide las credenciales'
            });
        }
        //Validar Password
        const validPassword = bcrypt.compareSync(password, correoExistente.password);
        if(!validPassword){
            return res.status(400).json({
                ok: false,
                msg: 'Valide las credenciales'
            });
        }

        //Se genera el token al aceptar las validaciones
        const token = await generarToken(correoExistente.id);

        res.json({
            ok: true,
            usuario: correoExistente,
            token
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            masg: 'Hable con el administrador'
        });
        throw new Error('Comuniquese con el Admi');
    }

};

const tokenUser = async(req, res = response) => {

    const uid = req.uid;
    //Gerenar un nuevo token, con el uid
    const token = await generarToken(uid);
    //Obtener el usuario por el uid
    const usuario = await Usuario.findById(uid);

    res,json({
        ok: true,
        usuario,
        token
    });
}

module.exports = {
    crearUsuario,
    loginUsuario,
    tokenUser
};