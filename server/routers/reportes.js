const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');
const mssql = require('mssql');
const { verificaToken, verificaEJEC_ROLE, verificaADMIN_ROLE } = require('../middlewares/autorizacion');
var moment = require('moment');

app.post('/reporteCompliance', [verificaToken, verificaADMIN_ROLE], (req, res) => {

    let body = JSON.parse(req.body.json) // recibe la información json
        //let body = req;

    escribirReporte = (data) => {

        let nombre = data.nombre;
        let id = data.datoConsultado;
        let idConsulta = data.idConsulta;
        let currently = moment().format('MMMM Do YYYY, h:mm:ss a');
        let titulos = `lista|tipo|presentaRiesgo|tieneResultados|presentaAdvertencia`;
        let resultados = data.resultados;
        let totalFuentes = data.totalFuentesConsultadas;
        let presentaRiesgo = data.presentaRiesgo;
        let listasConsultadas = '';
        resultados.forEach(element => {
            listasConsultadas += `${element.lista}|${element.tipo}|${element.presentaRiesgo}|${element.tieneResultados}|${element.presentaAdvertencia}\n`
        })

        let document = `Fecha : ${currently} Consulta #: ${idConsulta}\nDatos consultados: ${nombre} ${id}\n${titulos}\n${listasConsultadas}\nTotal fuentes: ${totalFuentes}\nPresenta Riesgo: ${presentaRiesgo}`;


        fs.writeFile(`./reportesBase/${idConsulta} ${nombre}.id_${id}.txt`, document, (err) => {

            if (err) throw err;


            //console.log('The file has been saved!');


            res.download(path.join(__dirname, '../reportesBase', `${idConsulta} ${nombre}.id_${id}.txt`), `${idConsulta} ${nombre}.id_${id}.txt`, (err) => {
                if (err) {
                    console.log(err);
                }

                borrarReporte(`${idConsulta} ${nombre}.id_${id}.txt`);
                //console.log('descargado');
            });


        });




    }


    borrarReporte = (name) => {



        fs.unlinkSync(`./reportesBase/${name}`, (err) => {

            if (err) throw err;

            return;
        });
    }


    escribirReporte(body);

});





app.get('/reporteUsers', [verificaToken, verificaEJEC_ROLE], (req, res) => {

    var request = new mssql.Request();



    var insert1 = `GET_users`

    request.query(insert1, (err, result) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        let users = result.recordsets[0]

        let data1 = '';

        users.forEach(element => {
            data1 += `${element.tipoId}|${element.usuaNumeroIdentificacion}|${element.usuaRazonSocial}|${element.escontraparte}|${element.usuaPEP}|${element.usuaObservacion}\n`;

        });
        let data2 = `Tipo Id|Identificacion|Razon Social|Es Contraparte|Es PEP|Observacion\n${data1}`;

        fs.writeFile('./reportesBase/ReporteUsers.txt', data2, (err) => {
            if (err) throw err;

            //console.log('The file has been saved!');
            res.download(path.join(__dirname, '../reportesBase', 'ReporteUsers.txt'), 'ReporteUsers.txt', (err) => {
                if (err) {
                    console.log(err);
                }
                //console.log('descargado');
            });

        });




    });

});


app.get('/reporteContrapartes', [verificaToken, verificaEJEC_ROLE], (req, res) => {

    var request = new mssql.Request();



    var insert1 = `GET_contrapartes`

    request.query(insert1, (err, result) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        let contrapartes = result.recordsets[0]

        let data1 = '';

        contrapartes.forEach(element => {
            data1 += `${element.tipoId}|${element.usuaNumeroIdentificacion}|${element.usuaRazonSocial}|${element.usuaOrden}|${element.usuaPagare}|${element.usuaCliente}|${element.usuaProveedor}|${element.usuaEmpleado}|${element.nombreMunicipio}|${element.nombreDepartamento}|${element.usuaObservacion}\n`;

        });
        let data2 = `Tipo Id|Identificacion|Razon Social|Orden|Pagare|EsCliente|EsProveedor|EsEmpleado|Municipio|Departamento|Observacion\n${data1}`;

        fs.writeFile('./reportesBase/ReporteContrapartes.txt', data2, (err) => {

            if (err) throw err;

            //console.log('The file has been saved!');
            res.download(path.join(__dirname, '../reportesBase', 'ReporteContrapartes.txt'), 'ReporteContrapartes.txt', (err) => {
                if (err) {
                    console.log(err);
                }
                //console.log('descargado');
            });

        });



    });

});




app.get('/reporteRepresentantes', [verificaToken, verificaEJEC_ROLE], (req, res) => {

    var request = new mssql.Request();



    var insert1 = `GET_Representantes`

    request.query(insert1, (err, result) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        let representantes = result.recordsets[0]

        let data1 = '';

        representantes.forEach(element => {
            data1 += `${element.contNumeroIdentificacion}|${element.contNombre}|${element.tipoId}|${element.usuaNumeroIdentificacion}|${element.usuaRazonSocial}|${element.nombreCargo}\n`;

        });
        let data2 = `NroIdCon|Nombre Contraparte|tipoDocRep|NroIdRep|Nombre Representante|Cargo\n${data1}`;

        fs.writeFile('./reportesBase/ReporteRepresentantes.txt', data2, (err) => {
            if (err) throw err;

            //console.log('The file has been saved!');
            res.download(path.join(__dirname, '../reportesBase', 'ReporteRepresentantes.txt'), 'ReporteRepresentantes.txt', (err) => {
                if (err) {
                    console.log(err);
                }
                //console.log('descargado');
            });

        });



    })

});




app.get('/reporteSolicitudes', /*[verificaToken, verificaEJEC_ROLE],*/ (req, res) => {

    var request = new mssql.Request();



    var insert1 = `GET_solicitudes`


    request.query(insert1, (err, result) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        let solicitudes = result.recordsets[0]

        let data1 = '';

        solicitudes.forEach(element => {
            data1 += `${element.contNumeroIdentificacion}|${element.contNombre}|${element.soliConsecutivo}|${element.nombreEjecutivo}|${element.nombreSolicitud}|${element.nombreEstado}|${element.nombreCausal}|${moment(element.soliFecha).format('YYYY/MM/DD')}|${moment(element.soliActualizacion).format('YYYY/MM/DD')}\n`;

        });
        let data2 = `Nit|Razon Social|Consecutivo|Ejecutivo|Tipo Solicitud|Estado|Causal|Fecha Solicitud|Fecha Respuesta\n${data1}`;

        fs.writeFile('./reportesBase/ReporteSolicitudes.txt', data2, (err) => {
            if (err) throw err;

            //console.log('The file has been saved!');
            res.download(path.join(__dirname, '../reportesBase', 'ReporteSolicitudes.txt'), 'ReporteSolicitudes.txt', (err) => {
                if (err) {
                    console.log(err);
                }
                console.log('Reportes Solicitudes descargado');
            });

        });




    });

});


app.get('/reporteSolicitudesEst/:id', [verificaToken, verificaADMIN_ROLE], (req, res) => {

    var request = new mssql.Request();

    let id = req.params.id;

    let estadoId = id;


    var insert1 = `GETIDEST_solicitudes '${estadoId}'`

    request.query(insert1, (err, result) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        let solicitudes = result.recordsets[0]

        let data1 = '';

        solicitudes.forEach(element => {
            data1 += `${element.usuario}|${ moment(element.soliFecha).format('l')}|${element.soliConsecutivo}|${element.contNumeroIdentificacion}|${element.contNombre}|${element.nombreEstado}|${element.nombreCausal}\n`;

        });
        let data2 = `Responsable|Radicado|Consecutivo|Identificacion|Nombre|Estado|Causal\n${data1}`;

        fs.writeFile('./reportesBase/ReporteSolicitudesEst.txt', data2, (err) => {
            if (err) throw err;

            res.download(path.join(__dirname, '../reportesBase', 'ReporteSolicitudesEst.txt'), 'ReporteSolicitudesEst.txt', (err) => {
                if (err) {
                    console.log(err);
                }

            });

        });

    });

});



app.get('/reporteRepresentantesCon/:nit', [verificaToken, verificaADMIN_ROLE], (req, res) => {

    var request = new mssql.Request();

    let id = req.params.nit;

    let contNumeroIdentificacion = id;

    var insert1 = `GETPERCON_Representantes '${contNumeroIdentificacion}'`

    request.query(insert1, (err, result) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        let representantes = result.recordsets[0]

        let data1 = '';

        representantes.forEach(element => {
            data1 += `${ moment(element.usuaFechaActualizacion).format('l')}|${element.tipoId}|${element.usuaNumeroIdentificacion}|${element.usuaRazonSocial}|${element.nombreCargo}|${element.usuaObservacion}|${element.contNumeroIdentificacion}-${element.contNombre}\n`;

        });
        let data2 = `Actualizacion|TipoId|Identificacion|Representante|Cargo|Comentario|Contraparte\n${data1}`;

        fs.writeFile('./reportesBase/ReporteRepresentantesCon.txt', data2, (err) => {
            if (err) throw err;

            res.download(path.join(__dirname, '../reportesBase', 'ReporteRepresentantesCon.txt'), 'ReporteRepresentantesCon.txt', (err) => {
                if (err) {
                    console.log(err);
                }

            });

        });

    });

});




app.get('/reporteCargos', [verificaToken, verificaEJEC_ROLE], (req, res) => {

    var request = new mssql.Request();

    var insert1 = `GET_cargos`

    request.query(insert1, (err, result) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        let cargos = result.recordsets[0]
            //console.log(cargos);


        let data1 = '';

        cargos.forEach(element => {
            data1 += `${ moment(element.cargoFechaInicio).format('l')}|${moment(element.cargoActualizacion).format('l')}|${element.cargoId}|${element.nombreCargo}|${element.estadoCargo}\n`;

        });
        let data2 = `FInicio|Factualización|cargoId|nombreCargo|estadoCargo\n${data1}`;

        fs.writeFile('./reportesBase/ReporteCargos.txt', data2, (err) => {
            if (err) throw err;

            res.download(path.join(__dirname, '../reportesBase', 'ReporteCargos.txt'), 'ReporteCargos.txt', (err) => {
                if (err) {
                    console.log(err);
                }

            });

        });

    });

});



app.get('/reporteCausales', [verificaToken, verificaEJEC_ROLE], (req, res) => {


    var request = new mssql.Request();

    var insert1 = `GET_causales`

    request.query(insert1, (err, result) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        let causales = result.recordsets[0]

        let data1 = '';

        causales.forEach(element => {


            data1 += `${moment(element.causalFechaInicio).format('l')}|${moment(element.causalActualizacion).format('l')}|${element.causalId}|${element.nombreCausal}|${element.estadoCausal}\n`;

        });
        let data2 = `FInicio|Factualización|causalId|nombreCausal|estadoCausal\n${data1}`;

        fs.writeFile('./reportesBase/ReporteCausales.txt', data2, (err) => {
            if (err) throw err;

            res.download(path.join(__dirname, '../reportesBase', 'ReporteCausales.txt'), 'ReporteCausales.txt', (err) => {
                if (err) {
                    console.log(err);
                }

            });

        });

    });

});



app.get('/reporteEjecutivos', [verificaToken, verificaEJEC_ROLE], (req, res) => {


    var request = new mssql.Request();

    var insert1 = `GET_ejecutivos`

    request.query(insert1, (err, result) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }


        let ejecutivos = result.recordsets[0]

        let data1 = '';

        ejecutivos.forEach(element => {
            data1 += `${moment(element.ejecFechaInicio).format('l')}|${moment(element.ejecActualizacion).format('l')}|${element.ejecutivoId}|${element.nombreEjecutivo}|${element.ejecActivo}\n`;

        });
        let data2 = `FInicio|Factualización|ejecutivoId|nombreEjecutivo|ejecActivo\n${data1}`;

        fs.writeFile('./reportesBase/ReporteEjecutivos.txt', data2, (err) => {
            if (err) throw err;

            res.download(path.join(__dirname, '../reportesBase', 'ReporteEjecutivos.txt'), 'ReporteEjecutivos.txt', (err) => {
                if (err) {
                    console.log(err);
                }

            });

        });


    });


});


app.get('/reporteTiposIdentificacion', [verificaToken, verificaEJEC_ROLE], (req, res) => {


    var request = new mssql.Request();

    var insert1 = `GET_tiposIdentificacion`

    request.query(insert1, (err, result) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }


        let tiposIdentificacion = result.recordsets[0]

        let data1 = '';

        tiposIdentificacion.forEach(element => {
            data1 += `${moment(element.tipoFechaInicio).format('l')}|${moment(element.tipoActualizacion).format('l')}|${element.tipoId}|${element.tipoDocumento}|${element.estadotipoDocumento}\n`;

        });
        let data2 = `FInicio|Factualización|tipoId|tipoDocumento|estadotipoDocumento\n${data1}`;

        fs.writeFile('./reportesBase/ReporteTiposIdentificacion.txt', data2, (err) => {
            if (err) throw err;

            res.download(path.join(__dirname, '../reportesBase', 'ReporteTiposIdentificacion.txt'), 'ReporteTiposIdentificacion.txt', (err) => {
                if (err) {
                    console.log(err);
                }

            });

        });



    });


});


app.get('/reporteTiposSolicitud', [verificaToken, verificaEJEC_ROLE], (req, res) => {


    var request = new mssql.Request();

    var insert1 = `GET_tiposSolicitud`

    request.query(insert1, (err, result) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }


        let tiposSolicitud = result.recordsets[0]

        let data1 = '';

        tiposSolicitud.forEach(element => {
            data1 += `${moment(element.tipoSolicitudFechaInicio).format('l')}|${moment(element.tipoSolicitudActualizacion).format('l')}|${element.tipoSolicitudId}|${element.nombreSolicitud}|${element.estadoTipoSolicitud}\n`;

        });
        let data2 = `FInicio|Factualización|tipoSolicitudId|nombreSolicitud|estadoTipoSolicitud\n${data1}`;

        fs.writeFile('./reportesBase/ReporteTiposSolicitud.txt', data2, (err) => {
            if (err) throw err;

            res.download(path.join(__dirname, '../reportesBase', 'ReporteTiposSolicitud.txt'), 'ReporteTiposSolicitud.txt', (err) => {
                if (err) {
                    console.log(err);
                }

            });

        });

    });

});


app.get('/reporteEstados', [verificaToken, verificaEJEC_ROLE], (req, res) => {

    var request = new mssql.Request();

    var insert1 = `GET_estados`

    request.query(insert1, (err, result) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }


        let estados = result.recordsets[0]

        let data1 = '';

        estados.forEach(element => {
            data1 += `${moment(element.estadoFechaInicio).format('l')}|${moment(element.estadoActualizacion).format('l')}|${element.estadoId}|${element.nombreEstado}|${element.estadoActivo}\n`;

        });
        let data2 = `FInicio|Factualización|estadoId|nombreEstado|estadoActivo\n${data1}`;

        fs.writeFile('./reportesBase/ReporteEstados.txt', data2, (err) => {
            if (err) throw err;

            res.download(path.join(__dirname, '../reportesBase', 'ReporteEstados.txt'), 'ReporteEstados.txt', (err) => {
                if (err) {
                    console.log(err);
                }

            });

        });


    });


});


app.get('/reportePaises', [verificaToken, verificaEJEC_ROLE], (req, res) => {

    var request = new mssql.Request();

    var insert1 = `GET_paises`

    request.query(insert1, (err, result) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }


        let paises = result.recordsets[0]

        let data1 = '';

        paises.forEach(element => {
            data1 += `${moment(element.paisFechaInicio).format('l')}|${moment(element.paisActualizacion).format('l')}|${element.paisId}|${element.nombrePais}|${element.paisActivo}\n`;

        });
        let data2 = `FInicio|Factualización|paisId|nombrePais|paisActivo\n${data1}`;

        fs.writeFile('./reportesBase/ReportePaises.txt', data2, (err) => {
            if (err) throw err;

            res.download(path.join(__dirname, '../reportesBase', 'ReportePaises.txt'), 'ReportePaises.txt', (err) => {
                if (err) {
                    console.log(err);
                }

            });

        });


    });


});



app.get('/reporteDepartamentos', [verificaToken, verificaEJEC_ROLE], (req, res) => {


    var request = new mssql.Request();

    var insert1 = `GET_departamentos`

    request.query(insert1, (err, result) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }


        let departamentos = result.recordsets[0]

        let data1 = '';

        departamentos.forEach(element => {
            data1 += `${moment(element.departamentoFechaInicio).format('l')}|${moment(element.departamentoActualizacion).format('l')}|${element.departamentoId}|${element.nombreDepartamento}|${element.indicativo}|${element.departamentoActivo}|${element.paisId}\n`;

        });
        let data2 = `FInicio|Factualización|departamentoId|nombreDepartamento|indicativo|departamentoActivo|pais\n${data1}`;

        fs.writeFile('./reportesBase/ReporteDepartamentos.txt', data2, (err) => {
            if (err) throw err;

            res.download(path.join(__dirname, '../reportesBase', 'ReporteDepartamentos.txt'), 'ReporteDepartamentos.txt', (err) => {
                if (err) {
                    console.log(err);
                }

            });

        });


    });



});




app.get('/reporteMunicipios', [verificaToken, verificaEJEC_ROLE], (req, res) => {


    var request = new mssql.Request();

    var insert1 = `GET_municipios`

    request.query(insert1, (err, result) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }


        let municipios = result.recordsets[0]

        let data1 = '';

        municipios.forEach(element => {
            data1 += `${moment(element.municipioFechaInicio).format('l')}|${moment(element.municipioActualizacion).format('l')}|${element.municipioId}|${element.nombreMunicipio}|${element.municipioActivo}|${element.departamentoId}\n`;

        });
        let data2 = `FInicio|Factualización|municipioId|nombreMunicipio|municipioActivo|departamento\n${data1}`;

        fs.writeFile('./reportesBase/ReportePaises.txt', data2, (err) => {
            if (err) throw err;

            res.download(path.join(__dirname, '../reportesBase', 'ReportePaises.txt'), 'ReportePaises.txt', (err) => {
                if (err) {
                    console.log(err);
                }

            });

        });


    });



});


module.exports = app;