const express = require('express');
const app = express();
const mssql = require('mssql');
var moment = require('moment')
const { verificaToken, verificaEJEC_ROLE, verificaADMIN_ROLE } = require('../middlewares/autorizacion');






app.get('/municipioDpto/:id', [verificaToken, verificaADMIN_ROLE], (req, res) => {


    var request = new mssql.Request();

    let ids = req.params.id;

    let departamentoId = ids;

    var insert1 = `GETTRUE_municipios '${departamentoId}'`

    request.query(insert1, (err, result) => {

        if (err) return res.status(400).json({
            ok: false,
            err
        });


        res.json({
            ok: true,
            municipios: result.recordset
        });
    });


});




app.get('/municipioItem/:id', verificaToken, (req, res) => {


    var request = new mssql.Request();

    let ids = req.params.id;

    let municipioId = ids;

    var insert1 = `GETID_municipios '${municipioId}'`

    request.query(insert1, (err, result) => {

        if (err) return res.status(400).json({
            ok: false,
            err
        });

        res.json({
            ok: true,
            municipios: result.recordsets[0]

        });
    });


});



app.post('/municipios', [verificaToken, verificaEJEC_ROLE], (req, res) => {

    var request = new mssql.Request();

    let body = JSON.parse(req.body.json) // recibe la información json
        //let body = req.body

    let fechaInicio = moment(new Date()).format('YYYYMMDD h:mm:ss');
    let municipioId = body.municipioId;
    let nombreMunicipio = body.nombreMunicipio;
    let departamentoId = body.departamento;
    let municipioActivo = body.municipioActivo;
    let usuario = req.usuario.identificacion;

    var insert1 = `ALTA_municipios '${fechaInicio}','${municipioId}','${nombreMunicipio}','${departamentoId}','${municipioActivo}','${usuario}','@message output'`

    request.query(insert1, (err, result) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            municipio: result.recordset[0]
        });

    });

});




app.put('/municipios/:id', [verificaToken, verificaEJEC_ROLE], (req, res) => {


    var request = new mssql.Request();
    let ids = req.params.id;
    let body = JSON.parse(req.body.json) // recibe la información json
        //let body = req.body
    let fechaInicio = moment(new Date()).format('YYYYMMDD h:mm:ss');
    let municipioId = ids;
    let nombreMunicipio = body.nombreMunicipio;
    let departamentoId = body.departamento;
    let municipioActivo = body.municipioActivo;
    let usuario = req.usuario.identificacion;
    var insert1 = `UPDATE_municipios '${fechaInicio}','${municipioId}','${nombreMunicipio}','${departamentoId}','${municipioActivo}', '${usuario}','@message output'`
    request.query(insert1, (err, result) => {

        if (err) return res.status(400).json({
            ok: false,
            err
        });
        res.json({
            ok: true,
            municipios: result
        });
    });


});







module.exports = app;