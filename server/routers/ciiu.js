const express = require('express');
const app = express();
const { verificaToken, verificaADMIN_ROLE } = require('../middlewares/autorizacion');
const { getCIIU, postCIIU, putCIIU, deleteCIIU } = require('../middlewares/controllers/ciiu');

app.get('/ciiu', /*verificaToken,*/ getCIIU);

app.post('/ciiu', /*verificaToken,*/ postCIIU);

app.put('/ciiu', /*verificaToken,*/ putCIIU);

app.delete('/ciiu', /*verificaToken,*/ deleteCIIU);


module.exports = app;