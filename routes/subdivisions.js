var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');

//var db = mongojs('dbelectricals', ['colProjectDetails']);
var db = mongojs('mongodb://jagadish:12345@ds145303.mlab.com:45303/dbelectricals', ['colProjectDetails']);

router.put('/subdivision/:idProject', function(req, res, next){

    var subdivision = req.body;

    const subdivisionIndex = (parseInt(subdivision._id) - 1);

    var idDivision = req.query['idDivision'];
    const divisionIndex = (parseInt(idDivision) - 1);

    var setter = {};
    setter['Divisions.'+divisionIndex+".SubDivisions."+subdivisionIndex] = subdivision;

    if(!subdivision){

        res.status(400);
        res.json({
            "error": "Bad Data"
        });
    }
    else{

      db.colProjectDetails.update({_id: mongojs.ObjectId(req.params.idProject)}, {$set: setter}, {}, function(err, data){

          if(err){
              res.send(err);
          }

          res.json(data);
      });
    }
});

module.exports = router;
