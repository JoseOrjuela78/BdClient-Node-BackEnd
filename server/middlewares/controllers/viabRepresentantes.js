const mssql = require('mssql');
const moment = require('moment');
const { Viabilidad } = require('../../models/viabilidad');
const { getCompliance } = require('./compliance');

getViabRepresentantes = (req, res) => {

    var request = new mssql.Request();

    let consecutivo = parseInt(req.params.consecutivo);
    let repData = [];
    let enRiesgoData = [];
    let riesgo = false;

    var insert1 = `GET_viabRepresentantes '${consecutivo}'`;

    request.query(insert1, (err, viabRepDB) => {


        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        repData = viabRepDB.recordset;

        repData.forEach(Element => {

            if (Element.reprEnRiesgo) {
                enRiesgoData.push(Element.reprEnRiesgo)
            }

        });

        if (enRiesgoData.length > 0) {
            riesgo = true;

        } else {
            riesgo = false;

        }


        res.json({
            ok: true,
            data: viabRepDB,
            riesgo
        })

    });


};



postViabRepresentantes = async(req, res) => {



    var request = new mssql.Request();

    let repViab = JSON.parse(req.body.json);


    var insert1 = `ALUP_viabRepresentantes '${repViab.reprId}','${repViab.viabConsecutivo}','${repViab.viabNumeroIdentificacion}','${repViab.tipoIdentificacion}','${repViab.reprIdentificacion}','${repViab.reprNombre}','${repViab.cargoId}','${repViab.reprEnRiesgo}','${repViab.reprExisteEpicor}','${repViab.reprComentarios}','@message output'`

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
            message: 'Representante Creado'
        })

    });



};













putViabRepresentantes = (req, res) => {

    console.log('putViabilidad');
    console.log(req.body);

}



deleteViabRepresentantes = (req, res) => {

    var request = new mssql.Request();

    let uid = req.params.id;
    console.log(uid);

    var insert1 = `DELETEID_viabRepresentantes '${uid}','@message output'`;

    request.query(insert1, (err, viabRepDB) => {


        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }




        res.json({
            ok: true,
            msg: "Representante eliminado"

        });



    });

};






module.exports = {

    getViabRepresentantes,
    postViabRepresentantes,
    putViabRepresentantes,
    deleteViabRepresentantes
}