const express = require('express');
const app = express();
const mssql = require('mssql');
var moment = require('moment')
const { verificaToken, verificaEJEC_ROLE, verificaADMIN_ROLE } = require('../middlewares/autorizacion');



app.get('/representante/:id', verificaToken, (req, res) => {

    var request = new mssql.Request();

    let ids = req.params.id;


    var insert1 = `GETPERCON_Representantes '${ids}'`

    request.query(insert1, (err, result) => {

        if (err) return res.status(400).json({
            ok: false,
            err
        });

        res.json({
            ok: true,
            representantes: result.recordsets[0]

        });
    });


});



app.get('/representante/User/:id', verificaToken, (req, res) => {

    var request = new mssql.Request();

    let ids = req.params.id;


    var insert1 = `GETPERUSER_Representantes '${ids}'`

    request.query(insert1, (err, result) => {

        if (err) return res.status(400).json({
            ok: false,
            err
        });

        res.json({
            ok: true,
            representantes: result.recordsets[0]

        });
    });




});

app.post('/representante', [verificaToken, verificaADMIN_ROLE], (req, res) => {

    var request = new mssql.Request();

    let body = JSON.parse(req.body.json) // recibe la información json

    //let body = req.body
    let fechaInicio = moment(new Date()).format('YYYYMMDD h:mm:ss');
    let contNumeroIdentificacion = body.contNumeroIdentificacion;
    let usuaNumeroIdentificacion = body.usuaNumeroIdentificacion;
    let reprActivo = 1;
    let cargoId = body.cargos;
    let usuario = req.usuario.identificacion;

    var insert1 = `ALUP_representantes '${contNumeroIdentificacion}${usuaNumeroIdentificacion}','${fechaInicio}','${reprActivo}','${usuario}','${contNumeroIdentificacion}','${usuaNumeroIdentificacion}','${cargoId}','@message output'`

    request.query(insert1, (err, result) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            representante: result
        });

    });


});


app.put('/representante/:id', [verificaToken, verificaADMIN_ROLE], (req, res) => {

    var request = new mssql.Request();

    let ids = req.params.id;
    let usuario = req.usuario.identificacion;


    var insert1 = `UPDATE6_representantes '${ids}','${usuario}','@message output'`

    request.query(insert1, (err, result) => {

        if (err) return res.status(400).json({
            ok: false,
            err
        });

        res.json({
            ok: true,
            message: 'Representante Retirado'

        });
    });


});




app.delete('/representante/:id', [verificaToken, verificaADMIN_ROLE], (req, res) => {

    var request = new mssql.Request();

    let ids = req.params.id;
    let usuario = req.usuario.identificacion;


    var insert1 = `DELETEID_representantes '${ids}','${usuario}','@message output'`


    request.query(insert1, (err, result) => {

        if (err) return res.status(400).json({
            ok: false,
            err
        });

        res.json({
            ok: true,
            message: 'Representante Borrado'

        });
    });


});








module.exports = app;