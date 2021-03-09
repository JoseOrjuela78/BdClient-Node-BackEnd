const express = require('express');
const app = express();
const mssql = require('mssql');
var moment = require('moment')
const { verificaToken, verificaEJEC_ROLE } = require('../middlewares/autorizacion');


app.get('/tipoSolicitud', verificaToken, (req, res) => {

    var request = new mssql.Request();

    var insert1 = `GET_tiposSolicitud`

    request.query(insert1, (err, result) => {

        if (err) return res.status(400).json({
            ok: false,
            err
        });

        res.json({
            ok: true,
            tiposSolicitud: result.recordsets[0]

        });
    });


});



app.get('/tiposSolicitud/:id', verificaToken, (req, res) => {


    var request = new mssql.Request();

    let ids = req.params.id;

    let tipoSolicitudId = ids;

    var insert1 = `GETID_tiposSolicitud '${tipoSolicitudId}'`

    request.query(insert1, (err, result) => {

        if (err) return res.status(400).json({
            ok: false,
            err
        });

        res.json({
            ok: true,
            tiposSolicitud: result.recordsets[0]

        });
    });


});




app.post('/tipoSolicitud', [verificaToken, verificaEJEC_ROLE], (req, res) => {


    var request = new mssql.Request();

    let body = JSON.parse(req.body.json) // recibe la información json
        //let body = req.body

    let fechaInicio = moment(new Date()).format('YYYYMMDD h:mm:ss');
    let nombreSolicitud = body.nombreSolicitud;
    let estadoTipoSolicitud = body.estadoTipoSolicitud;
    let usuario = req.usuario.identificacion;



    var insert1 = `ALTA_tiposSolicitud '${fechaInicio}','${nombreSolicitud}','${estadoTipoSolicitud}','${usuario}','@message output'`

    request.query(insert1, (err, result) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            tSolicitud: result
        });

    });


});


app.put('/tipoSolicitud/:id', [verificaToken, verificaEJEC_ROLE], (req, res) => {

    var request = new mssql.Request();
    let ids = req.params.id;
    let body = JSON.parse(req.body.json) // recibe la información json
        //let body = req.body
    let fechaInicio = moment(new Date()).format('YYYYMMDD h:mm:ss');
    let tipoSolicitudId = ids;
    let nombreSolicitud = body.nombreSolicitud;
    let estadoTipoSolicitud = body.estadoTipoSolicitud;
    let usuario = req.usuario.identificacion;
    var insert1 = `UPDATE_tiposSolicitud '${fechaInicio}','${tipoSolicitudId}','${nombreSolicitud}','${estadoTipoSolicitud}','${usuario}','@message output'`
    request.query(insert1, (err, result) => {

        if (err) return res.status(400).json({
            ok: false,
            err
        });
        res.json({
            ok: true,
            tiposSolicitud: result
        });
    });



});



module.exports = app;