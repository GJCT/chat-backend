const jwt = require('jsonwebtoken');

const generarToken = (uid) => {
    return new Promise((resolve, reject) => {
        const payload = { uid };
        jwt.sign(payload, process.env.JWT_KEY, {
            expiresIn: '23h'
        },
            (err, token) => {
                if (err) {
                    //No se creo el token
                    reject('No se ha creado el JWT');
                } else {
                    //Token generado
                    resolve(token);
                }
            });
    });
}

const comprobarJWT = (token = '') => {
    try {
        const { uid } = jwt.verify(token, process.env.JWT_KEY);
        //req.uid = uid;
        return [true, uid];

    } catch (error) {
        return [false, null];
    }
}

module.exports = {
    generarToken,
    comprobarJWT
}