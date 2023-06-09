const { response } = require('express');
const jwt = require('jsonwebtoken');

const validarJWT = (req, res = response, next) => {
    // 1- Leer el token 
    const token = req.header('Authorization');
    
    if(!token){
        return res.status(401).json({
            ok: false,
            msg: 'No hay token para validar'
        });
    }

    try {
        const { uid } = jwt.verify(token, process.env.JWT_KEY);
        req.uid = uid; 
        
        next();
    } catch (error) {
        return res.status(404).json({
            ok: false,
            msg: 'Token no existente'
        });
    }


}

module.exports = {
    validarJWT
}