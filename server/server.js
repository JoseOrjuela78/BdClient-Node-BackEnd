const express = require('express');
var cors = require('cors');
const app = express();
const mssql = require('mssql');
const path = require('path');

app.set('port', process.env.PORT || 3000);
//Variables de conexión

var config = {
    user: 'SA',
    password: '19780914Jao',
    server: '192.168.0.30',
    port: 1433,
    database: 'BdClient',
    options: {
        enableArithAbort: true
    }
}

/* para activar en produccion

var config = {
    user: 'SACARTERA',
    password: 'C4rt3r4..',
    server: '128.1.6.37',
    port: 50063,
    database: 'SEDCartera',
    options: {
        enableArithAbort: true
    }
}

*/

// cors origin
app.use(cors());
/*
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization,token, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE, PATCH');
    next();
});
*/

// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// parse application/json
app.use(express.json())

// habilitar el index.html
app.use(express.static(path.resolve(__dirname, '../public')))

// configuracion global de rutas
app.use(require('./routers/index'));


var connetion = mssql.connect(config, (err, res) => {
        if (err) {
            console.log(err);
        } else {
            console.log('Base de datos SQL On Line');
            app.listen(app.get('port'), () => {
                console.log('Escuchando por el puerto: ', app.get('port'));
            })
        }



    }

);