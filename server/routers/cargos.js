const express = require('express');
const app = express();
const mssql = require('mssql');
var moment = require('moment')
const { verificaToken, verificaEJEC_ROLE } = require('../middlewares/autorizacion');

app.get('/cargos', verificaToken, (req, res) => {

    var request = new mssql.Request();


    var insert1 = `GET_cargos`

    request.query(insert1, (err, result) => {

        if (err) return res.status(400).json({
            ok: false,
            err
        });

        res.json({
            ok: true,
            cargos: result.recordsets[0]

        });
    });








});



app.get('/cargos/:id', verificaToken, (req, res) => {


    var request = new mssql.Request();

    let ids = req.params.id;

    let cargoId = ids;

    var insert1 = `GETID_cargos '${cargoId}'`

    request.query(insert1, (err, result) => {

        if (err) return res.status(400).json({
            ok: false,
            err
        });

        res.json({
            ok: true,
            cargos: result.recordsets[0]

        });
    });



});



app.post('/cargos', [verificaToken, verificaEJEC_ROLE], (req, res) => {

    var request = new mssql.Request();

    let body = JSON.parse(req.body.json) // recibe la información json
        //let body = req.body
    let fechaInicio = moment(new Date()).format('YYYYMMDD h:mm:ss');
    let nombreCargo = body.nombreCargo;
    let estadoCargo = body.estadoCargo;
    let usuario = req.usuario.identificacion;



    var insert1 = `ALTA_cargos '${fechaInicio}','${nombreCargo}','${estadoCargo}','${usuario}','@message output'`

    request.query(insert1, (err, result) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            cargo: result
        });

    });



});




app.put('/cargos/:id', [verificaToken, verificaEJEC_ROLE], (req, res) => {

    var request = new mssql.Request();
    let ids = req.params.id;
    let body = JSON.parse(req.body.json) // recibe la información json
        //let body = req.body
    let fechaInicio = moment(new Date()).format('YYYYMMDD h:mm:ss');
    let cargoId = ids;
    let nombreCargo = body.nombreCargo;
    let estadoCargo = body.estadoCargo;
    let usuario = req.usuario.identificacion;
    var insert1 = `UPDATE_cargos '${fechaInicio}','${cargoId}','${nombreCargo}','${estadoCargo}','${usuario}','@message output'`
    request.query(insert1, (err, result) => {

        if (err) return res.status(400).json({
            ok: false,
            err
        });
        res.json({
            ok: true,
            cargo: result
        });
    });



});





module.exports = app;