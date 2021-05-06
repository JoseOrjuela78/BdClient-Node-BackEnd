const express = require('express');
const app = express();

app.use(require('./usuario'));
app.use(require('./login'));
app.use(require('./paises'));
app.use(require('./departamentos'));
app.use(require('./municipios'));
app.use(require('./reportes'));
app.use(require('./cargos'));
app.use(require('./causales'));
app.use(require('./ejecutivos'));
app.use(require('./estados'));
app.use(require('./tiposSolicitud'));
app.use(require('./tiposIdentificacion'));
app.use(require('./users'));
app.use(require('./contrapartes'));
app.use(require('./representantes'));
app.use(require('./solicitudes'));
app.use(require('./score'));
app.use(require('./viabilidad'));
app.use(require('./uploads'));
app.use(require('./ciiu'));
app.use(require('./viabRepresentantes'));


module.exports = app;