const express = require('express');
const app = express();
const mssql = require('mssql');
const bcrypt = require('bcrypt');
var moment = require('moment')




app.post('/usuario', (req, res) => {
    var request = new mssql.Request();

    let body = JSON.parse(req.body.json);
    //let body = req.body

    let fechaInicio = moment(new Date()).format('YYYYMMDD h:mm:ss');
    let role = body.role;
    let nombre = body.nombre;
    let email = body.email;
    let password = bcrypt.hashSync(body.password, 10);
    let identificacion = body.identificacion;

    var insert1 = `EXEC ALTA_usuarios '${fechaInicio}','${role}','${nombre}','${email}','${password}','${identificacion}', '@message output'`

    request.query(insert1, (err, result) => {
        if (err) return res.status(400).json({
            ok: false,
            err: err.originalError.info.message
        });

        //console.log(result)
        res.json({
            ok: true,
            message: result.recordsets[0][0].message
        });
    })


})




module.exports = app;