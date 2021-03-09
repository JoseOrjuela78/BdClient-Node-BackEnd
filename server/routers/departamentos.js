const express = require('express');
const app = express();
const mssql = require('mssql');
var moment = require('moment')
const { verificaToken, verificaEJEC_ROLE } = require('../middlewares/autorizacion');






app.get('/departamentos', verificaToken, (req, res) => {


    var request = new mssql.Request();

    var insert1 = `GETTRUE_departamentos`

    request.query(insert1, (err, result) => {

        if (err) return res.status(400).json({
            ok: false,
            err
        });

        res.json({
            ok: true,
            departamentos: result.recordsets[0]

        });
    });


});


app.get('/departamento/:id', verificaToken, (req, res) => {


    var request = new mssql.Request();

    let ids = req.params.id;

    let departamentoId = ids;

    var insert1 = `GETID_departamentos '${departamentoId}'`

    request.query(insert1, (err, result) => {

        if (err) return res.status(400).json({
            ok: false,
            err
        });

        res.json({
            ok: true,
            departamentos: result.recordsets[0]

        });
    });


});



app.post('/departamentos', [verificaToken, verificaEJEC_ROLE], (req, res) => {


    var request = new mssql.Request();

    let body = JSON.parse(req.body.json) // recibe la información json
        //let body = req.body

    let fechaInicio = moment(new Date()).format('YYYYMMDD h:mm:ss');
    let departamentoId = body.departamentoId;
    let nombreDepartamento = body.nombreDepartamento;
    let indicativo = body.indicativo;
    let paisId = body.pais;
    let departamentoActivo = body.departamentoActivo;
    let usuario = req.usuario.identificacion;

    var insert1 = `ALTA_departamentos '${fechaInicio}','${departamentoId}','${nombreDepartamento}',${indicativo},'${paisId}','${departamentoActivo}','${usuario}','@message output'`

    request.query(insert1, (err, result) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            departamento: result.recordset[0]
        });

    });






});




app.put('/departamentos/:id', [verificaToken, verificaEJEC_ROLE], (req, res) => {


    var request = new mssql.Request();
    let ids = req.params.id;
    let body = JSON.parse(req.body.json) // recibe la información json
        //let body = req.body
    let fechaInicio = moment(new Date()).format('YYYYMMDD h:mm:ss');
    let departamentoId = ids;
    let nombreDepartamento = body.nombreDepartamento;
    let indicativo = body.indicativo;
    let paisId = body.pais;
    let departamentoActivo = body.departamentoActivo;
    let usuario = req.usuario.identificacion;
    var insert1 = `UPDATE_departamentos '${fechaInicio}','${departamentoId}','${nombreDepartamento}','${indicativo}','${paisId}', '${departamentoActivo}', '${usuario}','@message output'`
    request.query(insert1, (err, result) => {

        if (err) return res.status(400).json({
            ok: false,
            err
        });
        res.json({
            ok: true,
            departamentos: result
        });
    });


});


module.exports = app;