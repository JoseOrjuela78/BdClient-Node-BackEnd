const jwt = require('jsonwebtoken'); // sql

//=========================
//VERIFICA TOKEN
//=========================

let verificaToken = (req, res, next) => {

    let token = req.get('token');

    jwt.verify(token, 'BdCliente-2020-001', (err, decoded) => {

        if (err) {
            return res.status(401).json({
                ok: false,
                err
            });

        }
        req.usuario = decoded.usuario;



        next();
    });

};

//=========================
//VERIFICA ADMIN_ROLE
//=========================

let verificaADMIN_ROLE = (req, res, next) => {

    usuario = req.usuario;
    //console.log(usuario);

    if (usuario.role === 'ADMIN_ROLE') {
        next();

    } else {
        return res.json({
            ok: false,
            err: {
                message: 'El usuario no es administrador'
            }
        });



    }

};

let verificaEJEC_ROLE = (req, res, next) => {

    usuario = req.usuario;


    if (usuario.role === 'EJEC_ROLE') {
        next();

    } else {
        return res.json({
            ok: false,
            err: {
                message: 'El usuario no esta autorizado'
            }
        });



    }

};



module.exports = {
    verificaToken,
    verificaADMIN_ROLE,
    verificaEJEC_ROLE
}