const mssql = require('mssql');
const moment = require('moment');
const { getCompliance } = require('./compliance');

getViabilidad = (req, res) => {

    var request = new mssql.Request();

    let nit = req.params.nit;

    var insert1 = `GETID_viabilidad '${nit}'`

    request.query(insert1, (err, viabDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }



        res.json({
            ok: true,
            data: viabDB,
        })

    });


};



postViabilidad = async(req, res) => {



    var request = new mssql.Request();

    let viab = JSON.parse(req.body.json);

    console.log(viab);

    upViabilidad = (comentario) => {



        viab.IdEjecutivo = `${req.usuario.identificacion}`;
        viab.viabNombreEjecutivo = `${req.usuario.nombre}`;

        viab.viabFecha = moment(new Date()).format('YYYYMMDD h:mm:ss');
        viab.viabFechaMatricula = moment(JSON.parse(req.body.json).viabFechaMatricula).format('YYYYMMDD');



        var insert1 = `ALTA_viabilidad '${viab.viabFecha}','${viab.IdEjecutivo}','${viab.tipoIdentificacion}','${viab.viabNumeroIdentificacion}','${viab.viabRazonSocial}','${viab.viabFechaMatricula}','${viab.viabAnoRenovado}','${viab.viabEnRiesgo}','${viab.viabExisteEpicor}','${viab.viabActualizado}','${viab.viabCupoActual}','${viab.viabCupoAsignado}','${viab.viabViable}','${comentario}','${viab.viabComentariosListas}','${viab.viabCIIU}','${viab.viabRevisado}','${viab.viabResponsableEpicor}','${viab.viabNombreEjecutivo}','@message output'`

        request.query(insert1, (err, viabDB) => {

            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }


            res.json({
                ok: true,
                data: viabDB,
                message: 'Viabilidad Creada'
            })

        });



    }



    await perfilResultante(viab.viabEnRiesgo, viab.viabExisteEpicor, viab.viabActualizado, viab.viabCupoAsignado, viab.tipoIdentificacion, viab.viabFechaMatricula, viab.viabCIIU, viab.viabAnoRenovado, viab.viabResponsableEpicor).then(mss => upViabilidad(mss));






};



putViabilidad = async(req, res) => {

    var request = new mssql.Request();

    let viab = JSON.parse(req.body.json);


    upDateViabilidad = (comentario) => {


        viab.IdEjecutivo = `${req.usuario.identificacion}`;
        viab.viabNombreEjecutivo = `${req.usuario.nombre}`;

        viab.viabFecha = moment(new Date()).format('YYYYMMDD h:mm:ss');
        viab.viabFechaMatricula = moment(JSON.parse(req.body.json).viabFechaMatricula).format('YYYYMMDD');


        var insert1 = `UPDATE_viabilidad '${viab.viabConsecutivo}','${viab.viabEnRiesgo}','${comentario}','@message output'`

        request.query(insert1, (err, viabDB) => {

            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }


            res.json({
                ok: true,
                data: viabDB,
                message: 'Viabilidad Actualizada'
            })

        });



    }


    await perfilResultante(viab.viabEnRiesgo, viab.viabExisteEpicor, viab.viabActualizado, viab.viabCupoAsignado, viab.tipoIdentificacion, viab.viabFechaMatricula, viab.viabCIIU, viab.viabAnoRenovado, viab.viabResponsableEpicor).then(mss => upDateViabilidad(mss));


}

deleteViabilidad = (req, res) => {

    console.log('deleteViabilidad');

};






const perfilResultante = (enRiesgo, existeEpicor, debeActualizar, CupoAsignado, tipoIdentificacion, fechaMatricula, ciiu, anioRenovado, responsableEpicor) => {


    const validacion = new Promise((resolve, reject) => {

        if (enRiesgo === null || existeEpicor === null || debeActualizar === null || CupoAsignado === null || tipoIdentificacion === null || fechaMatricula === null || ciiu === null || anioRenovado === null || responsableEpicor === null) {

            reject.status(500).json({
                ok: false,
                err
            });
        } else {

            let viabilidad = () => {

                //Validaciones
                let bloqueados = ['BLOQUEADO', 'Inactivo', 'Juridico', 'No Existe'];
                const found = bloqueados.find(element => (element === responsableEpicor));


                let today, currenty, now, tieneContinuidad, actividadViable, anioVigente, vencimiento;
                today = new Date();
                currenty = moment(fechaMatricula);
                now = moment(today).diff(currenty, 'days');
                tieneContinuidad = now / 30 >= 5;
                actividadViable = parseInt(ciiu.substr(-1, 1)) === 1;
                anioVigente = today.getFullYear();
                vencimiento = (moment(today).diff(new Date(anioVigente, 2, 31), 'days')) >= 0;

                // Mensajes
                let mss;
                let mss0 = 'Cliente creado y activo en Epicor';
                let mss1 = 'Condición de pago contado';
                let mss2 = 'Condición de pago crédito';
                let mss3 = 'Debe actualizar documentos';
                let mss4 = `Cliente ${found} en Epicor`;

                let mss5 = 'Solicitante viable para vinculacion como distribuidor';
                let mss6 = `Solicitante debe renovar matricula mercantil año ${anioVigente}`;

                let mss7 = 'Solicitante no aplica como distribuidor';
                let mss8 = 'Solicitante debe realizar compra por la web';
                let mss9 = 'Requiere validación fase II';


                if (!enRiesgo) {

                    mss1 = `${mss0} ${mss1}`;
                    mss2 = `${mss0} ${mss2}`;
                    mss3 = `${mss0} ${mss3}`;

                } else {

                    mss1 = `${mss0} ${mss1} ${mss9}`;
                    mss2 = `${mss0} ${mss2} ${mss9}`;
                    mss3 = `${mss0} ${mss3} ${mss9}`;
                    mss5 = `${mss5} ${mss9}`;
                    mss8 = `${mss8} ${mss9}`;

                }


                //*****************************************************************************




                ///////////////// VALIDACION SI EXISTE EN EPICOR

                while (existeEpicor) {


                    while (found === undefined) {

                        while (!debeActualizar) {


                            while (CupoAsignado === 0) {


                                mss = mss1;
                                return mss
                            }


                            mss = mss2;
                            return mss
                        }




                        mss = mss3;
                        return mss
                    }


                    mss = mss4;
                    return mss



                }


                ///////////////// VALIDACION SI NO EXISTE EN EPICOR


                //// VALIDACION PN Y PJ

                while (tieneContinuidad === true && actividadViable === true) {

                    ////  TIENE CONTINUIDAD Y ACTIVIDAD ECONOMICA EN TECNOLOGIA

                    if (vencimiento === true && anioRenovado >= anioVigente) {


                        mss = mss5;
                        return mss



                    } else if (vencimiento === false && anioRenovado >= (anioVigente - 1)) {


                        mss = mss5
                        return mss


                    } else {


                        mss = mss6;

                        return mss

                    }

                }


                if (tipoIdentificacion === 'nit ') {

                    //// VALIDACION PERSONA JURIDICA


                    mss = mss7;
                    return mss

                } else {

                    //// VALIDACION PERSONA NATURAL


                    mss = mss8;
                    return mss

                }




            };

            resolve(viabilidad());


        }




    });


    return validacion;


}






module.exports = {
    getViabilidad,
    postViabilidad,
    putViabilidad,
    deleteViabilidad
}