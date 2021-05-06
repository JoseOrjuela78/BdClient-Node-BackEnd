const moment = require('moment');
const mssql = require('mssql');


getCIIU = (req, res) => {

    var request = new mssql.Request();

    var insert1 = `GET_CIIU`

    request.query(insert1, (err, result) => {

        if (err) return res.status(400).json({
            ok: false,
            err
        });



        res.json({
            ok: true,
            ciiu: result.recordset

        });


    });

};

postCIIU = (req, res) => {

    console.log('postCIIU');

};

putCIIU = (req, res) => {

    console.log('putCIIU');

};

deleteCIIU = (req, res) => {

    console.log('deleteCIIU');

};




module.exports = {
    getCIIU,
    postCIIU,
    putCIIU,
    deleteCIIU
}