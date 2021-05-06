const express = require('express');
const app = express();
const mssql = require('mssql');
var moment = require('moment')
const { verificaToken, verificaADMIN_ROLE } = require('../middlewares/autorizacion');

app.get('/contraparte/:id', verificaToken, (req, res) => {


    var request = new mssql.Request();

    let id = req.params.id;

    var insert1 = `GETID_contrapartes '${id}'`

    request.query(insert1, (err, result) => {

        if (err) return res.status(400).json({
            ok: false,
            err
        });


        res.json({
            ok: true,
            contraparteDB: result.recordsets

        });
    });


});





app.put('/contraparte/:id', [verificaToken, verificaADMIN_ROLE], (req, res) => {

    var request = new mssql.Request();

    let ids = req.params.id;
    let body = JSON.parse(req.body.json);
    let contFechaActualizacion = moment(new Date()).format('YYYYMMDD h:mm:ss');
    let contNombre = body.contNombre;
    let contActivo = 1;
    let contObservacion = body.contObservacion;
    let contCupoVigente = 0;
    let contFechaCupoVigente = contFechaActualizacion;
    let usuario = req.usuario.identificacion;


    var insert1 = `UPDATE_contrapartes '${contFechaActualizacion}','${contNombre}','${contActivo}','${ids}','${contObservacion}','${contCupoVigente}','${contFechaCupoVigente}','${usuario}','@message output'`

    request.query(insert1, (err, contraparteDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }


        res.json({
            ok: true,
            contraparte: contraparteDB
        })

    });

});


app.put('/contraparteE/:id', [verificaToken, verificaADMIN_ROLE], (req, res) => {

    var request = new mssql.Request();

    let ids = req.params.id;
    let body = JSON.parse(req.body.json);
    let contFechaActualizacion = moment(new Date()).format('YYYYMMDD h:mm:ss');
    let contNombre = body.contNombre;
    let contActivo = 0;
    let contObservacion = body.contObservacion;
    let contCupoVigente = 0;
    let contFechaCupoVigente = contFechaActualizacion;
    let usuario = req.usuario.identificacion;


    var insert1 = `UPDATE_contrapartes '${contFechaActualizacion}','${contNombre}','${contActivo}','${ids}','${contObservacion}','${contCupoVigente}','${contFechaCupoVigente}','${usuario}','@message output'`

    request.query(insert1, (err, contraparteDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }


        res.json({
            ok: true,
            contraparte: contraparteDB
        })

    });


});










module.exports = app;