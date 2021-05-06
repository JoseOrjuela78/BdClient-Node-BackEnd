const express = require('express');
const app = express();
const path = require('path');
const multer = require('multer');

let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, '../server/documents')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));

    }


});



const upload = multer({ storage });


app.post('/uploads', upload.single('file'), (req, res) => {



    res.json({
        ok: true,
        data: req.file,
        message: 'Archivo guardado'
    })
});





module.exports = app;