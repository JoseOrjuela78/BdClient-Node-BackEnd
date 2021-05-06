const express = require('express');
const app = express();
const { verificaToken, verificaADMIN_ROLE } = require('../middlewares/autorizacion');
const { getViabilidad, postViabilidad, putViabilidad, deleteViabilidad } = require('../middlewares/controllers/viabilidad');

app.get('/viabilidad/:nit', verificaToken, getViabilidad);

app.post('/viabilidad', verificaToken, postViabilidad);

app.put('/viabilidad', verificaToken, putViabilidad);

app.delete('/viabilidad', verificaToken, deleteViabilidad);


module.exports = app;