const express = require('express');
const app = express();
const mssql = require('mssql');
var moment = require('moment')
const { verificaToken, verificaEJEC_ROLE } = require('../middlewares/autorizacion');

app.get('/estados', verificaToken, (req, res) => {

    var request = new mssql.Request();

    var insert1 = `GET_estados`

    request.query(insert1, (err, result) => {

        if (err) return res.status(400).json({
            ok: false,
            err
        });

        res.json({
            ok: true,
            estados: result.recordsets[0]

        });
    });

});




app.get('/estadoss/:id', verificaToken, (req, res) => {


    var request = new mssql.Request();

    let ids = req.params.id;

    let estadoId = ids;

    var insert1 = `GETID_estados '${estadoId}'`

    request.query(insert1, (err, result) => {

        if (err) return res.status(400).json({
            ok: false,
            err
        });

        res.json({
            ok: true,
            estados: result.recordsets[0]

        });
    });


});






app.post('/estados', [verificaToken, verificaEJEC_ROLE], (req, res) => {


    var request = new mssql.Request();

    let body = JSON.parse(req.body.json) // recibe la información json
        //let body = req.body

    let fechaInicio = moment(new Date()).format('YYYYMMDD h:mm:ss');
    let nombreEstado = body.nombreEstado;
    let estadoActivo = body.estadoActivo;
    let usuario = req.usuario.identificacion;



    var insert1 = `ALTA_estados '${fechaInicio}','${nombreEstado}','${estadoActivo}','${usuario}','@message output'`

    request.query(insert1, (err, result) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            estado: result
        });

    });



});

app.put('/estados/:id', [verificaToken, verificaEJEC_ROLE], (req, res) => {


    var request = new mssql.Request();
    let ids = req.params.id;
    let body = JSON.parse(req.body.json) // recibe la información json
        //let body = req.body
    let fechaInicio = moment(new Date()).format('YYYYMMDD h:mm:ss');
    let estadoId = ids;
    let nombreEstado = body.nombreEstado;
    let estadoActivo = body.estadoActivo;
    let usuario = req.usuario.identificacion;
    var insert1 = `UPDATE_estados '${fechaInicio}','${estadoId}','${nombreEstado}','${estadoActivo}','${usuario}','@message output'`
    request.query(insert1, (err, result) => {

        if (err) return res.status(400).json({
            ok: false,
            err
        });
        res.json({
            ok: true,
            estado: result
        });
    });



});



module.exports = app;