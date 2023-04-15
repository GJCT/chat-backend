/*
 Path = (api/usuarios)
 */

const {Router} = require('express');
const { validarJWT } = require('../middlewares/validarJWT');
const { getUsuarios } = require('../controllers/usuarios');
 
 const router = Router();
 
 //Validar el token = validJWT
 router.get('/', validarJWT, getUsuarios);
 
 
 module.exports = router;