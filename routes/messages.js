/*
    Path: /api/mensajes
*/

const {Router} = require('express');
const { validarJWT } = require('../middlewares/validarJWT');
const { obtenerChat } = require('../controllers/messages');
 
 const router = Router();
 
 //Validar el token = validJWT
 router.get('/:de', validarJWT, obtenerChat);
 
 
 module.exports = router;