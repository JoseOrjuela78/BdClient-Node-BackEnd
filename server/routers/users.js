const express = require('express');
const app = express();
const mssql = require('mssql');
const moment = require('moment');
const { request } = require('request');
const { verificaToken, verificaADMIN_ROLE } = require('../middlewares/autorizacion');
const { pruebaToken, pruebaGetCompliance } = require('../middlewares/controllers/compliance');


app.get('/user/buscar/:nit', verificaToken, (req, res) => {

    var request = new mssql.Request();

    let ids = req.params.nit;

    let usuaNumeroIdentificacion = ids;

    var insert1 = `GETID_users '${usuaNumeroIdentificacion}'`

    request.query(insert1, (err, result) => {


        if (err) return res.status(400).json({
            ok: false,
            err
        });



        res.json({
            ok: true,
            user: result.recordset

        });
    });


});



app.get('/user/buscarR/:termino', verificaToken, (req, res) => {

    var request = new mssql.Request();

    let id = req.params.termino;

    var insert1 = `GETTERMINO_users '${id}'`

    request.query(insert1, (err, result) => {

        if (err) return res.status(400).json({
            ok: false,
            err
        });

        res.json({
            ok: true,
            userDB: result.recordset

        });
    });


});






app.post('/user', [verificaToken, verificaADMIN_ROLE], (req, res) => {

    var request = new mssql.Request();

    let body = JSON.parse(req.body.json); // recibe la información json
    //let body = req.body
    let fechaInicio = moment(new Date()).format('YYYYMMDD h:mm:ss');

    let escontraparte = body.escontraparte;

    if (!escontraparte) {
        escontraparte = false;
    }

    let usuaPEP = body.esPEP;
    if (!usuaPEP) {
        usuaPEP = false;
    }

    let usuaFechaMatricula = moment(body.usuaFechaMatricula).format('YYYYMMDD');
    let usuaFechaNacimiento = moment(body.usuaFechaNacimiento).format('YYYYMMDD');
    let usuaObservacion = body.usuaObservacion;

    let usuaOrden = body.usuaOrden;

    if (!usuaOrden) {
        usuaOrden = '00000';
    }

    let usuaPagare = body.usuaPagare;

    if (!usuaPagare) {
        usuaPagare = false;
    }

    let usuaCliente = body.usuaCliente;

    if (!usuaCliente) {
        usuaCliente = false;
    }

    let usuaProveedor = body.usuaProveedor;

    if (!usuaProveedor) {
        usuaProveedor = false;
    }

    let usuaEmpleado = body.usuaEmpleado;

    if (!usuaEmpleado) {
        usuaEmpleado = false;
    }

    let usuaCIIU = body.usuaCIIU;

    if (!usuaCIIU) {
        usuaCIIU = '00000';
    }

    let usuaMail = body.usuaMail;

    if (!usuaMail) {
        usuaMail = 'No aplica';
    }

    let usuario = req.usuario.identificacion;
    let usuaNumeroIdentificacion = body.usuaNumeroIdentificacion;
    let tipoId = body.tipoIdentificacion;
    let usuaFechaInicio = fechaInicio;
    let usuaRazonSocial = body.usuaRazonSocial;
    let usuaConcatenado = `${body.usuaNumeroIdentificacion} ${body.usuaRazonSocial}`;

    let municipios;

    if (escontraparte) {
        municipios = body.municipios;
        AlupContrapartes(fechaInicio, usuaRazonSocial, escontraparte, usuaNumeroIdentificacion, usuaObservacion, 0, fechaInicio, usuario);

    } else {
        municipios = '00000';

    }


    var insert1 = `ALTA_users '${escontraparte}','${usuaPEP}','${usuaFechaMatricula}','${usuaFechaNacimiento}','${usuaObservacion}','${usuaOrden}','${usuaPagare}','${usuaCliente}','${usuaProveedor}','${usuaEmpleado}','${usuaCIIU}','${usuaMail}','${usuario}','${usuaNumeroIdentificacion}','${tipoId}','${usuaFechaInicio}','${usuaRazonSocial}','${usuaConcatenado}','${municipios}','@message output'`

    request.query(insert1, (err, userDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            userDB,
            message: 'Usuario Creado'
        })

    });

});


app.put('/user/:nit', [verificaToken, verificaADMIN_ROLE], (req, res) => {



    var request = new mssql.Request();

    let id = req.params.nit;

    let body = JSON.parse(req.body.json);


    let fechaInicio = moment(new Date()).format('YYYYMMDD h:mm:ss');

    let escontraparte = body.escontraparte;

    if (!escontraparte) {
        escontraparte = false;
    }

    let usuaPEP = body.esPEP
    if (!usuaPEP) {
        usuaPEP = false;
    } else {
        usuaPEP = body.esPEP
    }


    let usuaFechaMatricula = body.usuaFechaMatricula;

    if (!usuaFechaMatricula || usuaFechaMatricula == '1899-12-31') {
        usuaFechaMatricula = '19000101 12:00:00'
    } else {
        usuaFechaMatricula = moment(body.usuaFechaMatricula).format('YYYYMMDD');
    }



    let usuaFechaNacimiento = body.usuaFechaNacimiento;

    if (!usuaFechaNacimiento || usuaFechaNacimiento == '1899-12-31') {
        usuaFechaNacimiento = '19000101 12:00:00'
    } else {
        usuaFechaNacimiento = moment(body.usuaFechaNacimiento).format('YYYYMMDD');
    }


    let usuaObservacion = body.usuaObservacion;

    let usuaOrden = body.usuaOrden;

    if (!usuaOrden) {
        usuaOrden = '00000';
    }

    let usuaPagare = body.usuaPagare;

    if (!usuaPagare) {
        usuaPagare = false;
    }

    let usuaCliente = body.usuaCliente;

    if (!usuaCliente) {
        usuaCliente = false;
    }

    let usuaProveedor = body.usuaProveedor;

    if (!usuaProveedor) {
        usuaProveedor = false;
    }

    let usuaEmpleado = body.usuaEmpleado;

    if (!usuaEmpleado) {
        usuaEmpleado = false;
    }

    let usuaCIIU = body.usuaCIIU;

    if (!usuaCIIU) {
        usuaCIIU = '00000';
    }

    let usuaMail = body.usuaMail;

    if (!usuaMail) {
        usuaMail = 'No aplica';
    }

    let usuario = req.usuario.identificacion;
    let usuaNumeroIdentificacion = id;
    let tipoId = body.tipoIdentificacion;
    let usuaFechaActualizacion = fechaInicio;
    let usuaRazonSocial = body.usuaRazonSocial;
    let usuaConcatenado = `${body.usuaNumeroIdentificacion} ${body.usuaRazonSocial}`;

    let municipios;

    if (escontraparte) {
        municipios = body.municipios;
        AlupContrapartes(usuaFechaActualizacion, usuaRazonSocial, escontraparte, usuaNumeroIdentificacion, usuaObservacion, 0, fechaInicio, usuario);


    } else {

        municipios = '00000';
        UpdateContrapartes(usuaFechaActualizacion, usuaRazonSocial, escontraparte, usuaNumeroIdentificacion, usuaObservacion, 0, fechaInicio, usuario);

    }


    var insert1 = `UPDATE_users '${usuaFechaActualizacion}','${escontraparte}','${usuaPEP}','${usuaFechaMatricula}','${usuaFechaNacimiento}','${usuaObservacion}','${usuaOrden}','${usuaPagare}','${usuaCliente}','${usuaProveedor}','${usuaEmpleado}','${usuaCIIU}','${usuaMail}','${usuario}','${usuaNumeroIdentificacion}','${tipoId}','${usuaRazonSocial}','${usuaConcatenado}','${municipios}','@message output'`

    request.query(insert1, (err, userDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            userDB,
            message: 'Usuario Actualizado'
        })

    });




});


app.delete('/user/:nit', [verificaToken, verificaADMIN_ROLE], (req, res) => {
    var request = new mssql.Request();

    let id = req.params.nit;
    let fechaInicio = moment(new Date()).format('YYYYMMDD h:mm:ss');
    let usuaNumeroIdentificacion = id;
    let usuario = req.usuario.identificacion;

    DeleteRepresentantes(usuaNumeroIdentificacion, usuario);



    var insert1 = `DELETE_users '${usuaNumeroIdentificacion}','${usuario}','@message output'`

    request.query(insert1, (err, userDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        DeleteContrapartes(fechaInicio, usuaNumeroIdentificacion, usuario);

        res.json({
            ok: true,
            message: 'Usuario Eliminado'
        })

    });







});



//FUNCIONES AUXILIARES


function AlupContrapartes(contFechaActualizacion, contNombre, contActivo, contNumeroIdentificacion, contObservacion, contCupoVigente, contFechaCupoVigente, usuario) {

    var request = new mssql.Request();

    var insert1 = `ALUP_contrapartes '${contFechaActualizacion}','${contNombre}','${contActivo}','${contNumeroIdentificacion}','${contObservacion}','${contCupoVigente}','${contFechaCupoVigente}','${usuario}','@message output'`

    request.query(insert1, (err, contraparteDB) => {

        AlupRepresentantes(`${contNumeroIdentificacion}${contNumeroIdentificacion}`, contFechaActualizacion, contActivo, usuario, contNumeroIdentificacion, contNumeroIdentificacion, 7);


        //console.log(contraparteDB);


    });

}


function UpdateContrapartes(contFechaActualizacion, contNombre, contActivo, contNumeroIdentificacion, contObservacion, contCupoVigente, contFechaCupoVigente, usuario) {

    var request = new mssql.Request();

    var insert1 = `UPDATE_contrapartes '${contFechaActualizacion}','${contNombre}','${contActivo}','${contNumeroIdentificacion}','${contObservacion}','${contCupoVigente}','${contFechaCupoVigente}','${usuario}','@message output'`

    request.query(insert1, (err, contraparteDB) => {


        //console.log(contraparteDB);


    });

}

function DeleteContrapartes(contFechaActualizacion, contNumeroIdentificacion, usuario) {

    var request = new mssql.Request();

    var insert1 = `DELETE_contrapartes '${contFechaActualizacion}',${contNumeroIdentificacion},'${usuario}','@message output'`

    request.query(insert1, (err, representanteDB) => {



        // console.log(representanteDB);


    });

}



function AlupRepresentantes(idRepresentante, fechaVinculacion, reprActivo, usuario, contNumeroIdentificacion, usuaNumeroIdentificacion, cargoId) {

    var request = new mssql.Request();

    var insert1 = `ALUP_representantes '${idRepresentante}','${fechaVinculacion}','${reprActivo}','${usuario}','${contNumeroIdentificacion}','${usuaNumeroIdentificacion}','${cargoId}','@message output'`

    request.query(insert1, (err, representanteDB) => {



        // console.log(representanteDB);


    });

}


function DeleteRepresentantes(usuaNumeroIdentificacion, usuario) {

    var request = new mssql.Request();

    var insert1 = `DELETE_representantes '${usuaNumeroIdentificacion}','${usuario}','@message output'`

    request.query(insert1, (err, representanteDB) => {



        // console.log(representanteDB);


    });

}






app.get('/tokenCompliance', pruebaToken);







app.post('/listas', [verificaToken, verificaADMIN_ROLE], pruebaGetCompliance);




module.exports = app;