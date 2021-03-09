const express = require('express');
const app = express();
const mssql = require('mssql');
const bodyParser = require('body-parser');
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

// cors origin
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization,token, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// habilitar el index.html
app.use(express.static(path.resolve(__dirname, '../public')))

// configuracion global de rutas
app.use(require('./routers/index'));


app.get('/users', (req, res, next) => {
    var request = new mssql.Request();
    request.query('select * from tiposIdentificacion', (err, result) => {
        if (err) return next(err);

        console.log(result)
        res.json({ result });
    })
})



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