const { comprobarJWT } = require('../helpers/jwt');
const { io } = require('../index');
const { usuarioDesconectado, usuarioConectado, grabarMensaje } = require('../controllers/socket')

// Mensajes de Sockets
io.on('connection', (client) => {
    console.log('Cliente conectado');

    //console.log(client.handshake.headers['Authorization']);
    const [valido, uid] = comprobarJWT(client.handshake.headers['Authorization']);

    console.log(valido, uid);
    //Validar autenticación
    if(!valido){return client.disconnect();}
    //Cliente conectado
    usuarioConectado(uid);

    //Conectar usuario a sala... 1- sala global
    client.join(uid);

    //Resivir el mensaje enviado
    client.on('mensaje-personal', async(payload) => {
        console.log(payload);
        await grabarMensaje(payload);
        io.to(payload.para).emit('mensaje-personal', payload);
    });



    client.on('disconnect', () => {
        console.log('Cliente desconectado');
        usuarioDesconectado(uid);
    });

    // client.on('mensaje', ( payload ) => {
    //     console.log('Mensaje', payload);

    //     io.emit( 'mensaje', { admin: 'Nuevo mensaje' } );

    // });


});
