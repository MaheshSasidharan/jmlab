var express = require('express');
var router = express.Router();
var fs = require("fs");

router.get('/GetPubs', function(req, res, next) {
    var filePath = "researchInfo/pubs.txt";
    fs.readFile(filePath, function(err, data) {
        if (err) {
            return res.json({ status: false });
        };
        var arrPubs = data.toString().split("\n");
        for (i in arrPubs) {
            console.log(arrPubs[i]);
        }
        return res.json({ status: true, pubs: arrPubs });
    });

});

module.exports = router;
