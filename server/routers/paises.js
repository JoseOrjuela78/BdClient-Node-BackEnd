const express = require('express');
const app = express();
const mssql = require('mssql');
var moment = require('moment')
const { verificaToken, verificaEJEC_ROLE } = require('../middlewares/autorizacion');



app.get('/paises/:id', [verificaToken, verificaEJEC_ROLE], (req, res) => {

    var request = new mssql.Request();

    let ids = req.params.id;

    let paisId = ids;

    var insert1 = `GETID_paises '${paisId}'`

    request.query(insert1, (err, result) => {

        if (err) return res.status(400).json({
            ok: false,
            err
        });


        res.json({
            ok: true,
            paises: result.recordsets[0]

        });
    });

});



app.post('/pais', [verificaToken, verificaEJEC_ROLE], (req, res) => {
    var request = new mssql.Request();

    let body = JSON.parse(req.body.json) // recibe la información json
        //let body = req.body


    let fechaInicio = moment(new Date()).format('YYYYMMDD h:mm:ss');
    let paisId = body.paisId;
    let nombrePais = body.nombrePais;
    let paisActivo = body.paisActivo;
    let usuario = req.usuario.identificacion;

    console.log(fechaInicio, paisId, nombrePais, paisActivo, usuario);

    var insert1 = `ALTA_paises '${fechaInicio}','${paisId}','${nombrePais}','${paisActivo}','${usuario}','@message output'`


    request.query(insert1, (err, result) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            pais: result.recordset[0]
        });

    });


});

app.put('/pais/:id', [verificaToken, verificaEJEC_ROLE], (req, res) => {

    var request = new mssql.Request();

    let ids = req.params.id;

    let body = JSON.parse(req.body.json) // recibe la información json
        //let body = req.body

    let fechaInicio = moment(new Date()).format('YYYYMMDD h:mm:ss');
    let paisId = ids;


    let nombrePais = body.nombrePais;
    let paisActivo = body.paisActivo;
    let usuario = req.usuario.identificacion;

    var insert1 = `UPDATE_paises '${fechaInicio}','${paisId}','${nombrePais}','${paisActivo}','${usuario}','@message output'`

    request.query(insert1, (err, result) => {

        if (err) return res.status(400).json({
            ok: false,
            err
        });


        res.json({
            ok: true,
            paises: result

        });
    });

});






module.exports = app;