/*
 Path = (api/)
 */

const {Router} = require('express');
const { check } = require('express-validator');

const {crearUsuario, loginUsuario, tokenUser} = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar');
const { validarJWT } = require('../middlewares/validarJWT');

const router = Router();

router.post('/new', [
    check('nombre', 'El nombre es obligotorio').not().isEmpty().trim(),
    check('password', 'La contraseña es obligotorio').not().isEmpty().isLength({min:8}),
    check('password2', 'La contraseña es obligotorio').custom((value, { req}) =>{
        if(value != req.body.password){
            throw new Error('Las contraseñas no coinciden');
        };
        return true;
    }),
    check('correo', 'El correo es obligotorio').isEmail(),
    validarCampos
], crearUsuario);

router.post('/login', [
    check('correo', 'El correo es obligatorio').isEmail(),
    check('password', 'La contraseña es obligotorio').not().isEmpty().isLength({min:8}),
    validarCampos
], loginUsuario);

//Validar el token = validJWT
router.get('/token', validarJWT, tokenUser);


module.exports = router;