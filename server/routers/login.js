const express = require('express');
const app = express();
const mssql = require('mssql');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


app.post('/login', (req, res) => {
    var request = new mssql.Request();

    let body = JSON.parse(req.body.json);

    //let body = req.body

    let email = body.email;
    let password = body.password;

    var insert1 = `LOGIN_usuarios '${email}', '@message output'`

    request.query(insert1, (err, result) => {
        if (err) return res.status(400).json({
            ok: false,
            err: err.originalError.info.message
        });


        if (!result.recordsets[0][0]) {
            return res.status(400).json({
                ok: false,
                message: 'usuario o contraseña invalidos'

            });
        }


        if (!bcrypt.compareSync(password, result.recordsets[0][0].password)) {

            return res.json({
                ok: false,
                message: 'usuario o contraseña invalidos'

            });

        }

        let token = jwt.sign({
            usuario: result.recordsets[0][0]
        }, 'BdCliente-2020-001', { expiresIn: '8h' });


        res.json({
            ok: true,
            message: result.recordsets[1][0].message,
            usuario: result.recordsets[0][0],
            token: token

        });
    })


})

module.exports = app;