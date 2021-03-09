const express = require('express');
const app = express();
const mssql = require('mssql');
var moment = require('moment')
const { verificaToken, verificaEJEC_ROLE } = require('../middlewares/autorizacion');



app.get('/causales', verificaToken, (req, res) => {

    var request = new mssql.Request();

    var insert1 = `GET_causales`

    request.query(insert1, (err, result) => {

        if (err) return res.status(400).json({
            ok: false,
            err
        });

        res.json({
            ok: true,
            causales: result.recordsets[0]

        });
    });

});




app.get('/causales/:id', verificaToken, (req, res) => {

    var request = new mssql.Request();

    let ids = req.params.id;

    let causalId = ids;

    var insert1 = `GETID_causales '${causalId}'`

    request.query(insert1, (err, result) => {

        if (err) return res.status(400).json({
            ok: false,
            err
        });

        res.json({
            ok: true,
            causales: result.recordsets[0]

        });
    });



});




app.post('/causales', [verificaToken, verificaEJEC_ROLE], (req, res) => {


    var request = new mssql.Request();

    let body = JSON.parse(req.body.json) // recibe la información json
        //let body = req.body

    let fechaInicio = moment(new Date()).format('YYYYMMDD h:mm:ss');
    let nombreCausal = body.nombreCausal;
    let estadoCausal = body.estadoCausal;
    let usuario = req.usuario.identificacion;



    var insert1 = `ALTA_causales '${fechaInicio}','${nombreCausal}','${estadoCausal}','${usuario}','@message output'`

    request.query(insert1, (err, result) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            causal: result
        });

    });


});

app.put('/causales/:id', [verificaToken, verificaEJEC_ROLE], (req, res) => {


    var request = new mssql.Request();
    let ids = req.params.id;
    let body = JSON.parse(req.body.json) // recibe la información json
        //let body = req.body
    let fechaInicio = moment(new Date()).format('YYYYMMDD h:mm:ss');
    let causalId = ids;
    let nombreCausal = body.nombreCausal;
    let estadoCausal = body.estadoCausal;
    let usuario = req.usuario.identificacion;
    var insert1 = `UPDATE_causales '${fechaInicio}','${causalId}','${nombreCausal}','${estadoCausal}','${usuario}','@message output'`
    request.query(insert1, (err, result) => {

        if (err) return res.status(400).json({
            ok: false,
            err
        });
        res.json({
            ok: true,
            causales: result
        });
    });

})

module.exports = app;