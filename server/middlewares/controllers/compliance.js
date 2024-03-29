const fs = require('fs');
const path = require('path');
var moment = require('moment');
var request = require('request');
const { nextTick } = require('process');

let token;


const pruebaToken = (rep, res) => {

    const solicitarToken = () => {



        var optionsToken = {
            'method': 'GET',
            'url': 'https://app.compliance.com.co/validador/apiPublica/TokenService/token',
            'headers': {
                'Authorization': 'Basic U0VEIEludDpOYXQxOTEyODYwOEFMRio='
            }
        };


        request(optionsToken, function(error, response) {


            if (error) {
                console.log(error);
            } else {


                token = JSON.parse(response.body).token;

                if (!token) {
                    next();
                }



            };


        });

    };

    setInterval(solicitarToken, 5000);


};


const pruebaGetCompliance = (req, res) => {


    let body = JSON.parse(req.body.json);
    //let body = req.body;
    let tipoDoc = body.tipoIdentificacion.trim();
    let datoCo = body.usuaNumeroIdentificacion;
    let nombrePasaporte = "";

    infoCompliance(res, token, tipoDoc, datoCo, nombrePasaporte);
};

const infoCompliance = (res, token, tipoDoc, datoCo, nombrePas) => {


    var options = {
        'method': 'POST',
        'url': 'https://app.compliance.com.co/validador/ws/ConsultaConsolidadaService/consultaConsolidada/soloRiesgo/false',
        'headers': {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'text/plain'
        },

        body: `{\r\n    \"tipoDocumento\":\"${tipoDoc}\",\r\n    \"datoConsultar\":\"${datoCo}\"\r\n,\r\n    \"nombrePasaporte\":\"${nombrePas}\"\r\n}`


    };



    request(options, function(error, response) {



        let objetoCompliance = {

            "nombre": 'No Consultado',
            "presentaRiesgo": false,
            "idConsulta": "",
            "resultados": []
        }

        let resultado = {};


        if (error) throw new Error(error);

        let data = JSON.parse(response.body).error;


        if (!data) {

            data = JSON.parse(response.body);

            objetoCompliance.nombre = data.nombre;
            objetoCompliance.idConsulta = `id: ${data.idConsulta}`;

            if (data.presentaRiesgo) {

                objetoCompliance.presentaRiesgo = true;

                data.resultados.forEach(element => {
                    if (element.presentaRiesgo) {

                        objetoCompliance.resultados.push("Riesgo :", element.lista);


                    }

                });

                resultado = objetoCompliance;

            } else {


                data.resultados.forEach(element => {
                    if (element.presentaAdvertencia) {

                        objetoCompliance.resultados.push("Novedad :", element.lista);

                    };
                });


                if (objetoCompliance.resultados.length > 0) {
                    objetoCompliance.presentaRiesgo = true;

                } else {
                    objetoCompliance.resultados.push(`No Presenta Novedades en listas`);
                }


                resultado = objetoCompliance;

            }

        }




        res.json({
            ok: true,
            resultado,
            data
        });



    });



};





module.exports = {
    pruebaToken,
    pruebaGetCompliance
};