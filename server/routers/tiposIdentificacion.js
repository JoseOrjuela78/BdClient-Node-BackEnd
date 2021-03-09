const express = require('express');
const app = express();
const mssql = require('mssql');
var moment = require('moment')
const { verificaToken, verificaEJEC_ROLE } = require('../middlewares/autorizacion');



app.get('/tipoIdentificacion', verificaToken, (req, res) => {

    var request = new mssql.Request();

    let ids = req.params.id;

    let tipoId = ids;

    var insert1 = `GETTRUE_tiposIdentificacion`

    request.query(insert1, (err, result) => {

        if (err) return res.status(400).json({
            ok: false,
            err
        });

        res.json({
            ok: true,
            tiposIdentificacion: result.recordset

        });
    });


});


app.get('/tiposIdentificacion/:id', verificaToken, (req, res) => {


    var request = new mssql.Request();

    let ids = req.params.id;

    let tipoId = ids;

    var insert1 = `GETID_tiposIdentificacion '${tipoId}'`

    request.query(insert1, (err, result) => {

        if (err) return res.status(400).json({
            ok: false,
            err
        });

        res.json({
            ok: true,
            tiposIdentificacion: result.recordsets[0]

        });
    });


});



app.post('/tipoIdentificacion', [verificaToken, verificaEJEC_ROLE], (req, res) => {


    var request = new mssql.Request();

    let body = JSON.parse(req.body.json) // recibe la información json
        //let body = req.body

    let fechaInicio = moment(new Date()).format('YYYYMMDD h:mm:ss');
    let tipoId = body.tipoId;
    let tipoDocumento = body.tipoDocumento;
    let estadotipoDocumento = body.estadotipoDocumento;
    let usuario = req.usuario.identificacion;



    var insert1 = `ALTA_tiposIdentificacion '${fechaInicio}','${tipoId}','${tipoDocumento}','${estadotipoDocumento}','${usuario}','@message output'`

    request.query(insert1, (err, result) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            tipoIdentificacion: result
        });

    });




});

app.put('/tipoIdentificacion/:id', [verificaToken, verificaEJEC_ROLE], (req, res) => {


    var request = new mssql.Request();
    let ids = req.params.id;
    let body = JSON.parse(req.body.json) // recibe la información json
        //let body = req.body
    let fechaInicio = moment(new Date()).format('YYYYMMDD h:mm:ss');
    let tipoId = ids;
    let tipoDocumento = body.tipoDocumento;
    let estadotipoDocumento = body.estadotipoDocumento;
    let usuario = req.usuario.identificacion;
    var insert1 = `UPDATE_tiposIdentificacion '${fechaInicio}','${tipoId}','${tipoDocumento}','${estadotipoDocumento}','${usuario}','@message output'`
    request.query(insert1, (err, result) => {

        if (err) return res.status(400).json({
            ok: false,
            err
        });
        res.json({
            ok: true,
            tiposIdentificacion: result
        });
    });


});




module.exports = app;