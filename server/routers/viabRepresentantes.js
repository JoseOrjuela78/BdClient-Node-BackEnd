const express = require('express');
const app = express();
const { verificaToken, verificaADMIN_ROLE } = require('../middlewares/autorizacion');
const { getViabRepresentantes, postViabRepresentantes, putViabRepresentantes, deleteViabRepresentantes } = require('../middlewares/controllers/viabRepresentantes');


app.get('/viabRepresentante/:consecutivo', /*verificaToken,*/ getViabRepresentantes);

app.post('/viabRepresentante', /* verificaToken,*/ postViabRepresentantes);

app.put('/viabRepresentante', /*verificaToken,*/ putViabRepresentantes);

app.delete('/viabRepresentante/:id', /*verificaToken,*/ deleteViabRepresentantes);


module.exports = app;