const express = require('express');
const app = express();
const mssql = require('mssql');
var moment = require('moment')
const { verificaToken, verificaEJEC_ROLE } = require('../middlewares/autorizacion');

app.get('/ejecutivoTrue', verificaToken, (req, res) => {

    var request = new mssql.Request();

    var insert1 = `GETTRUE_ejecutivos`

    request.query(insert1, (err, result) => {

        if (err) return res.status(400).json({
            ok: false,
            err
        });

        res.json({
            ok: true,
            ejecutivos: result.recordsets[0]

        });
    });

});



app.get('/ejecutivo', verificaToken, (req, res) => {

    var request = new mssql.Request();

    var insert1 = `GET_ejecutivos`

    request.query(insert1, (err, result) => {

        if (err) return res.status(400).json({
            ok: false,
            err
        });

        res.json({
            ok: true,
            ejecutivos: result.recordsets[0]

        });
    });

});



app.get('/ejecutivos/:id', verificaToken, (req, res) => {


    var request = new mssql.Request();

    let ids = req.params.id;

    let ejecutivoId = ids;

    var insert1 = `GETID_ejecutivos '${ejecutivoId}'`

    request.query(insert1, (err, result) => {

        if (err) return res.status(400).json({
            ok: false,
            err
        });

        res.json({
            ok: true,
            ejecutivos: result.recordsets[0]

        });
    });


});





app.post('/ejecutivo', [verificaToken, verificaEJEC_ROLE], (req, res) => {


    var request = new mssql.Request();

    let body = JSON.parse(req.body.json) // recibe la información json
        //let body = req.body

    let fechaInicio = moment(new Date()).format('YYYYMMDD h:mm:ss');
    let nombreEjecutivo = body.nombreEjecutivo;
    let ejecActivo = body.ejecActivo;
    let usuario = req.usuario.identificacion;



    var insert1 = `ALTA_ejecutivos '${fechaInicio}','${nombreEjecutivo}','${ejecActivo}','${usuario}','@message output'`

    request.query(insert1, (err, result) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            ejecutivo: result
        });

    });



});



app.put('/ejecutivo/:id', [verificaToken, verificaEJEC_ROLE], (req, res) => {


    var request = new mssql.Request();
    let ids = req.params.id;
    let body = JSON.parse(req.body.json) // recibe la información json
        //let body = req.body
    let fechaInicio = moment(new Date()).format('YYYYMMDD h:mm:ss');
    let ejecutivoId = ids;
    let nombreEjecutivo = body.nombreEjecutivo;
    let ejecActivo = body.ejecActivo;
    let usuario = req.usuario.identificacion;
    var insert1 = `UPDATE_ejecutivos '${fechaInicio}','${ejecutivoId}','${nombreEjecutivo}','${ejecActivo}','${usuario}','@message output'`
    request.query(insert1, (err, result) => {

        if (err) return res.status(400).json({
            ok: false,
            err
        });
        res.json({
            ok: true,
            ejecutivos: result
        });
    });


});




module.exports = app;