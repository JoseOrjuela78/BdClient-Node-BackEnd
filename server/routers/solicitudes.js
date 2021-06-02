const express = require('express');
const app = express();
const mssql = require('mssql');
var moment = require('moment')
const { verificaToken, verificaADMIN_ROLE } = require('../middlewares/autorizacion');


app.get('/solicitud/:id', verificaToken, (req, res) => {

    var request = new mssql.Request();

    let ids = req.params.id;

    let soliConsecutivo = ids;

    var insert1 = `GETIDSOL_solicitudes '${soliConsecutivo}'`

    request.query(insert1, (err, result) => {

        if (err) return res.status(400).json({
            ok: false,
            err
        });

        res.json({
            ok: true,
            solicitud: result.recordset[0]

        });
    });





});


app.get('/solicitudes/:id', verificaToken, (req, res) => {

    var request = new mssql.Request();

    let ids = req.params.id;

    let contNumeroIdentificacion = ids;

    var insert1 = `GETID_solicitudes '${contNumeroIdentificacion}'`

    request.query(insert1, (err, result) => {

        if (err) return res.status(400).json({
            ok: false,
            err
        });

        res.json({
            ok: true,
            solicitudes: result.recordset,
            total: result.recordsets[1][0].total

        });
    });


});


app.get('/solicitudes/estado/:id', verificaToken, (req, res) => {

    var request = new mssql.Request();

    let ids = req.params.id;

    let estadoId = ids;

    var insert1 = `GETIDEST_solicitudes '${estadoId}'`

    request.query(insert1, (err, result) => {

        if (err) return res.status(400).json({
            ok: false,
            err
        });

        res.json({
            ok: true,
            solicitudes: result.recordset,
            total: result.recordsets[1][0].total

        });
    });

});


app.post('/solicitud', [verificaToken, verificaADMIN_ROLE], (req, res) => {

    var request = new mssql.Request();
    let body = JSON.parse(req.body.json); // recibe la información json
    let fechaInicio = moment(new Date()).format('YYYYMMDD h:mm:ss');

    let soliActualizacion = fechaInicio;

    let soliFechaExpedicionCcio = body.soliFechaExpedicionCcio;
    if (!soliFechaExpedicionCcio) {
        soliFechaExpedicionCcio = fechaInicio;
    }

    let soliAnoRenovado = body.soliAnoRenovado;
    if (!soliAnoRenovado) {
        soliAnoRenovado = 0000
    }

    let soliApruebaFormato = body.soliApruebaFormato;
    if (!soliApruebaFormato) {
        soliApruebaFormato = false;
    }

    let soliApruebaListasRestrictivas = body.soliApruebaListasRestrictivas;
    if (!soliApruebaListasRestrictivas) {
        soliApruebaListasRestrictivas = false;
    }

    let soliApruebaDatacredito = body.soliApruebaDatacredito;
    if (!soliApruebaDatacredito) {
        soliApruebaDatacredito = false;
    }

    let soliApruebaCartera = body.soliApruebaCartera;
    if (!soliApruebaCartera) {
        soliApruebaCartera = false;
    }

    let soliApruebaReferencias = body.soliApruebaReferencias;
    if (!soliApruebaReferencias) {
        soliApruebaReferencias = false;
    }

    let soliFechaRadicacion = body.soliFechaRadicacion;
    if (!soliFechaRadicacion) {
        soliFechaRadicacion = '19000101 12:00:00'
    }

    let soliFechaSolucion = body.soliFechaSolucion;
    if (!soliFechaSolucion) {
        soliFechaSolucion = '19000101 12:00:00'
    }


    let soliCupoAprobado = body.soliCupoAprobado;
    if (!soliCupoAprobado) {
        soliCupoAprobado = 0
    }

    let soliCupoAsignado = body.soliCupoAsignado;
    if (!soliCupoAsignado) {
        soliCupoAsignado = 0;
    }

    let soliFechaEnvioPagare = body.soliFechaEnvioPagare;
    if (!soliFechaEnvioPagare) {
        soliFechaEnvioPagare = '19000101 12:00:00'
    }

    let soliFechaRecibidoPagare = body.soliFechaRecibidoPagare;
    if (!soliFechaRecibidoPagare) {
        soliFechaRecibidoPagare = '19000101 12:00:00'
    }

    let soliComentarios = decodeURI(body.soliComentarios);
    if (!soliComentarios) {
        soliComentarios = "Sin Comentario"
    }

    let usuario = req.usuario.identificacion;

    let soliFecha = fechaInicio;
    let ejecutivoId = body.IdEjecutivo;
    let tipoSolicitudId = body.IdSolicitud;
    let contNumeroIdentificacion = body.contNumeroIdentificacion;

    let soliCupoActual = body.soliCupoActual;
    if (!soliCupoActual) {
        soliCupoActual = 0;
    }

    let soliCupoSolicitado = body.soliCupoSolicitado;
    if (!soliCupoSolicitado) {
        soliCupoSolicitado = 0;
    }

    let estadoId = body.IdEstado;

    actualizarPagare(contNumeroIdentificacion, estadoId);

    let causalId = body.IdCausal;

    let insert1 = `ALTA_solicitudes '${soliActualizacion}','${soliFechaExpedicionCcio}','${soliAnoRenovado}','${soliApruebaFormato}','${soliApruebaListasRestrictivas}','${soliApruebaDatacredito}','${soliApruebaCartera}','${soliApruebaReferencias}','${soliFechaRadicacion}','${soliFechaSolucion}','${soliCupoAprobado}','${soliCupoAsignado}','${soliFechaEnvioPagare}','${soliFechaRecibidoPagare}','${soliComentarios}','${usuario}','${soliFecha}','${ejecutivoId}','${tipoSolicitudId}','${contNumeroIdentificacion}','${soliCupoActual}','${soliCupoSolicitado}','${estadoId}','${causalId}','message OUTPUT'`

    request.query(insert1, (err, solicitudDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            solicitud: solicitudDB.recordset[0],
            message: 'Solicitud Creada'
        })

    });

});





app.put('/solicitud/:id', [verificaToken, verificaADMIN_ROLE], (req, res) => {


    var request = new mssql.Request();
    let ids = req.params.id;
    let body = JSON.parse(req.body.json); // recibe la información json
    let fechaInicio = moment(new Date()).format('YYYYMMDD h:mm:ss');

    let soliConsecutivo = ids;

    let soliActualizacion = fechaInicio;

    let soliFechaExpedicionCcio = body.soliFechaExpedicionCcio;
    if (!soliFechaExpedicionCcio || soliFechaExpedicionCcio == '1899-12-31') {
        soliFechaExpedicionCcio = fechaInicio;
    }

    let soliAnoRenovado = body.soliAnoRenovado;
    if (!soliAnoRenovado) {
        soliAnoRenovado = 0000
    }

    let soliApruebaFormato = body.soliApruebaFormato;
    if (!soliApruebaFormato) {
        soliApruebaFormato = false;
    }

    let soliApruebaListasRestrictivas = body.soliApruebaListasRestrictivas;
    if (!soliApruebaListasRestrictivas) {
        soliApruebaListasRestrictivas = false;
    }

    let soliApruebaDatacredito = body.soliApruebaDatacredito;
    if (!soliApruebaDatacredito) {
        soliApruebaDatacredito = false;
    }

    let soliApruebaCartera = body.soliApruebaCartera;
    if (!soliApruebaCartera) {
        soliApruebaCartera = false;
    }

    let soliApruebaReferencias = body.soliApruebaReferencias;
    if (!soliApruebaReferencias) {
        soliApruebaReferencias = false;
    }

    let soliFechaRadicacion = body.soliFechaRadicacion;
    if (!soliFechaRadicacion || soliFechaRadicacion == '1899-12-31') {
        soliFechaRadicacion = '19000101 12:00:00'
    }

    let soliFechaSolucion = body.soliFechaSolucion;
    if (!soliFechaSolucion || soliFechaSolucion == '1899-12-31') {
        soliFechaSolucion = '19000101 12:00:00'
    }


    let soliCupoAprobado = body.soliCupoAprobado;
    if (!soliCupoAprobado) {
        soliCupoAprobado = 0
    }

    let soliCupoAsignado = body.soliCupoAsignado;
    if (!soliCupoAsignado) {
        soliCupoAsignado = 0;
    }

    let soliFechaEnvioPagare = body.soliFechaEnvioPagare;
    if (!soliFechaEnvioPagare || soliFechaEnvioPagare == '1899-12-31') {
        soliFechaEnvioPagare = '19000101 12:00:00'
    }

    let soliFechaRecibidoPagare = body.soliFechaRecibidoPagare;
    if (!soliFechaRecibidoPagare || soliFechaRecibidoPagare == '1899-12-31') {
        soliFechaRecibidoPagare = '19000101 12:00:00'
    }

    let soliComentarios = decodeURI(body.soliComentarios);
    if (!soliComentarios) {
        soliComentarios = "Sin Comentario"
    }

    let usuario = req.usuario.identificacion;

    let ejecutivoId = body.IdEjecutivo;
    let tipoSolicitudId = body.IdSolicitud;
    let contNumeroIdentificacion = body.contNumeroIdentificacion;

    let soliCupoActual = body.soliCupoActual;
    if (!soliCupoActual) {
        soliCupoActual = 0;
    }

    let soliCupoSolicitado = body.soliCupoSolicitado;
    if (!soliCupoSolicitado) {
        soliCupoSolicitado = 0;
    }

    let estadoId = body.IdEstado;

    actualizarPagare(contNumeroIdentificacion, estadoId);

    let causalId = body.IdCausal;

    let insert1 = `UPDATE_solicitudes '${soliConsecutivo}','${soliActualizacion}','${soliFechaExpedicionCcio}','${soliAnoRenovado}','${soliApruebaFormato}','${soliApruebaListasRestrictivas}','${soliApruebaDatacredito}','${soliApruebaCartera}','${soliApruebaReferencias}','${soliFechaRadicacion}','${soliFechaSolucion}','${soliCupoAprobado}','${soliCupoAsignado}','${soliFechaEnvioPagare}','${soliFechaRecibidoPagare}','${soliComentarios}','${usuario}','${ejecutivoId}','${tipoSolicitudId}','${contNumeroIdentificacion}','${soliCupoActual}','${soliCupoSolicitado}','${estadoId}','${causalId}','message OUTPUT'`

    request.query(insert1, (err, solicitudDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            solicitud: solicitudDB.recordset[0],
            message: 'Solicitud Actulizada'
        })

    });


});


app.delete('/solicitud/:id', [verificaToken, verificaADMIN_ROLE], (req, res) => {

    var request = new mssql.Request();
    let ids = req.params.id;
    let soliConsecutivo = ids;

    let usuario = req.usuario.identificacion;

    let insert1 = `DELETE_solicitudes '${soliConsecutivo}','${usuario}','@message OUTPUT'`;


    request.query(insert1, (err, solicitudDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            message: `solicitud número ${soliConsecutivo} eliminada`
        })

    });




});


let actualizarPagare = (nit, estado) => {

    var request = new mssql.Request();

    if (estado === 8) {

        let insert1 = `UPDATEPagare_users '${nit}','@message OUTPUT'`;

        request.query(insert1, (err, userDB) => {

            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            //console.log('user actualizado');
        });

    }




}




















module.exports = app;