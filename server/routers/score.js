const express = require('express');
const app = express();
const mssql = require('mssql');
var moment = require('moment')
const { verificaToken, verificaADMIN_ROLE } = require('../middlewares/autorizacion');


app.get('/score', (req, res) => {

    function crearClasePersona() {
        // Crear una clase para construir objeto de tipo Persona.
        // el constructor debe recibir:
        // nombre (string) , edad (integer) , hobbies (array de strings) , amigos (array de objetos)
        // Esta funcion debe retonar la clase Persona.

        class Persona {

            constructor(nombre, edad) {

                this.nombre = nombre;
                this.edad = edad;
                this.hobbies = [];
                this.amigos = [];

            }

            addFriend(nombre, edad) {
                // el metodo addFriend recibe un string nombre y un entero edad y debe agregar un objeto:
                // { nombre: nombre, edad: edad} al arreglo de amigos de la persona.
                // no debe retornar nada.

                var amigo = {
                    nombre,
                    edad
                }
                this.amigos.push(amigo);


            }

            addHobby(hobby) {
                // este método debe agregar un hobby (hobby) al arreglo de hobbies de la persona.
                // no debe retornar nada.

                this.hobbies.push(hobby);

            }
            getFriends() {
                // Escribe una función que retorne un arreglo con sólo los nombres del arreglo de amigos
                // de la persona.
                // Ej:
                // persona.getFriends() // retorna ['toni', 'Leo', 'Manu']

                var friends = this.amigos.map(function(element) {
                    return element.nombre
                })

                return friends



            }

            getHobbies() {
                // Escribe una función que retorne un arreglo con los hobbies de la persona
                // Ej:
                // persona.getHobbies() // retorna ['correr', 'dormir', 'nadar']

                return this.hobbies

            }

            getPromedioEdad() {
                // Escribe una función que retorne el promedio de edad de los amigos de una persona
                // ej, si la persona tuviera estos amigos:
                // {
                //   amigos: [{
                //     nombre: 'toni',
                //     edad: 33,
                //   }, {
                //     nombre: 'Emi',
                //     edad: 25
                //   }]
                // }
                // persona.getPromedioEdad() // retorna 29


                var n = this.amigos.length

                var edades = this.amigos.map(function(element) {
                    return parseInt(element.edad)
                })

                var sumaEdades = edades.reduce(function(accumulator, currentValue) {
                    return (accumulator + currentValue)
                })

                var promedio = Math.round(sumaEdades / n);

                return promedio




            }

        };



        return Persona;
    }


    crearClasePersona()


});


/*

    //var request = new mssql.Request();


    //let body = JSON.parse(req.body.json) // recibe la información json
    let body = req.body // recibe la información json
    console.log(body)
        //let body = req.body

    // INPUTS 

    let fechaInicio = moment(new Date()).format('YYYYMMDD h:mm:ss');
    let fechaCorte = new Date(body.fechaCorte)
    let anio1 = fechaCorte.getFullYear();
    let mesesAnio1 = (fechaCorte.getMonth()) + 1;
    let anioO = anio1 - 1
    let IngresosOperacionalesAnio0 = body.IngresosOperacionalesAnio0;
    let IngresosOperacionalesAnio1 = body.IngresosOperacionalesAnio1;
    let IngresosNoOperacionales = body.IngresosNoOperacionales;
    let CostodeVentas = body.CostodeVentas;
    let CostosPersonalAdmon = body.CostosPersonalAdmon;
    let CostosPersonalVentas = body.CostosPersonalVentas;
    let OtrosGastos = body.OtrosGastos;
    let ActivoCorriente = body.ActivoCorriente;
    let Inventarios = body.Inventarios;
    let Activototal = body.Activototal;
    let Pasivos = body.Pasivos;
    let Proveedores = body.Proveedores;
    let PerdidasAcumuladas = body.PerdidasAcumuladas;
    let PuntosBasicos = body.PuntosBasicos;

    //OUTPUTS
    let mesesEstudio = mesesAnio1;
    let patrimonio = Activototal - Pasivos;
    let utilidadBruta = IngresosOperacionalesAnio1 - CostodeVentas;
    let utilidadOperacional = utilidadBruta - CostosPersonalAdmon - CostosPersonalVentas;
    let utilidadNeta = utilidadOperacional - OtrosGastos;
    let perUtilidadBruta = utilidadBruta / IngresosOperacionalesAnio1;
    let perUtilidadOperacional = utilidadOperacional / IngresosOperacionalesAnio1;
    let perUtilidadNeta = utilidadNeta / IngresosOperacionalesAnio1;
    let perPasivos = Pasivos / Activototal;
    let perProveedores = Proveedores / Pasivos;
    let perPerdidasAcumuladas = PerdidasAcumuladas / patrimonio;
    let liquidezCorriente = Activototal / Pasivos;
    let inventarioPropio = Inventarios / Proveedores; // Proveedores <>  0
    let promedioMesVentas = IngresosOperacionalesAnio1 / mesesEstudio;
    let cupoSugerido = Activototal * PuntosBasicos;
    let perCupoSugeridoUtilidadNeta = cupoSugerido / utilidadNeta;
    let perCupoSugeridoPatrimonio = cupoSugerido / patrimonio;
    let pruebaAcida = (ActivoCorriente - Inventarios) / Pasivos;
    let variacionVentas = ((IngresosOperacionalesAnio1 / mesesEstudio) / (IngresosOperacionalesAnio0 / 12)) - 1;

    //VALIDACION SCORE

    score(
        apruebaReferencias = true,
        aprubaCartera = true,
        apruebaDatacredito = true,
        perUtilidadBruta,
        perUtilidadOperacional,
        perUtilidadNeta,
        perPasivos,
        perCupoSugeridoUtilidadNeta,
        perCupoSugeridoPatrimonio,
        perPerdidasAcumuladas,
        liquidezCorriente,
        pruebaAcida,
        variacionVentas,
        cupoSugerido,
        res
    );









    /*
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
                message: 'Score Creado'
            })

        });

    


});





let score = (
    apruebaReferencias,
    aprubaCartera,
    apruebaDatacredito,
    perUtilidadBruta,
    perUtilidadOperacional,
    perUtilidadNeta,
    perPasivos,
    perCupoSugeridoUtilidadNeta,
    perCupoSugeridoPatrimonio,
    perPerdidasAcumuladas,
    liquidezCorriente,
    pruebaAcida,
    variacionVentas,
    cupoSugerido,
    res
) => {

    let result;

    let comportamientoEnPagos = 0;

    if (apruebaReferencias) {

        comportamientoEnPagos += 0.1;

    }

    if (!aprubaCartera) {

        return result = 'Credito negado por concepto cartera ';


    } else {

        comportamientoEnPagos += 0.1;
    }


    if (!apruebaDatacredito) {

        return result = 'Cliente reportado en datacredito';
    } else {
        comportamientoEnPagos += 0.25;
    }

    console.log('comportamientoEnPagos : ' + comportamientoEnPagos);
    //////////////////////////////////

    let Utilidad = 0;

    if (!(perUtilidadBruta > 0)) {

        return result = 'Perdida Bruta';

    } else {

        Utilidad += 0.0083;
    }

    if (!(perUtilidadOperacional > 0)) {

        return result = 'Perdida Operacional';
    } else {

        Utilidad += 0.0083;

    }


    if (!(perUtilidadNeta > 0)) {

        return result = 'Perdida Neta';

    } else {

        Utilidad += 0.0083;
    }

    console.log('Utilidad : ' + Utilidad)

    //////////////////////////////////

    let Endeudamiento = 0;

    if (perPasivos <= 0.8) {

        Endeudamiento += 0.05;


    } else if (perPasivos >= 0.95) {

        return result = 'Negado por Sobreendeudamiento';

    } else {

        Endeudamiento += 0.025;

    }

    console.log('Endeudamiento: ' + Endeudamiento)

    //////////////////////////////////


    let PerdidasAcumuladas = 0;


    if (perPerdidasAcumuladas > 0) {

        return result = 'Negado por perdidas acumuladas'

    } else {

        PerdidasAcumuladas += 0.1;
    }

    console.log('PerdidasAcumuladas : ' + PerdidasAcumuladas)

    //////////////////////////////////

    let CupoSugeridoVsUtilidadNeta = 0;

    if (perCupoSugeridoUtilidadNeta <= 1) {

        CupoSugeridoVsUtilidadNeta += 0.0083;

    }

    console.log('CupoSugeridoVsUtilidadNeta : ' + CupoSugeridoVsUtilidadNeta)

    //////////////////////////////////

    let CupoSugeridoVsPatrimonio = 0;

    if (perCupoSugeridoPatrimonio <= 0.25) {

        CupoSugeridoVsPatrimonio += 0.25;

    }

    console.log('CupoSugeridoVsPatrimonio : ' + CupoSugeridoVsPatrimonio)

    //////////////////////////////////


    let Liquidez = 0;

    if (liquidezCorriente >= 1) {

        Liquidez += 0.05;

    }

    if (pruebaAcida >= 1) {

        Liquidez += 0.05;

    }

    console.log('Liquidez : ' + Liquidez)

    //////////////////////////////////

    let VariacionVentas = 0;

    if (variacionVentas >= 0) {

        VariacionVentas += 0.02;

    }

    console.log('VariacionVentas : ' + VariacionVentas);

    //////////////////////////////////



    let TotalScore = comportamientoEnPagos + Utilidad + Endeudamiento + PerdidasAcumuladas + CupoSugeridoVsUtilidadNeta + CupoSugeridoVsPatrimonio + Liquidez + VariacionVentas;
    console.log('TotalScore : ' + TotalScore)


    if (TotalScore >= 0.75) {

        result = 'Credito viable por : ' + cupoSugerido + ' score : ' + TotalScore;

        res.json({
            ok: true,
            message: result
        })



        return console.log('Credito viable por : ' + cupoSugerido + ' score : ' + TotalScore);



    } else {

        res.json({
            ok: false,
            message: result
        })

        return console.log(result)

    }


}
 

*/



module.exports = app;