var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');

//var db = mongojs('dbelectricals', ['colProjectDetails']);
var db = mongojs('mongodb://jagadish:12345@ds145303.mlab.com:45303/dbelectricals', ['colProjectDetails']);

router.put('/village/:idProject/', function(req, res, next){

    var village = req.body;

    //const villageIndex = (parseInt(village._id) - 1);

    const villageIndex = parseInt(village.index);

    var idDivision = req.query['idDivision'];
    const divisionIndex = (parseInt(idDivision) - 1);

    var idSubDivision = req.query['idSubDivision'];
    const subDivisionIndex = (parseInt(idSubDivision) - 1);

    var idSection = req.query['idSection'];
    const sectionIndex = (parseInt(idSection) - 1);

    var setter = {};
    setter['Divisions.'+divisionIndex+".SubDivisions."+subDivisionIndex+".Sections."+sectionIndex+".Villages."+villageIndex] = village;

/*
        res.json({
            "Project": req.params.idProject,
            "Division": divisionIndex,
            "Sub-Division": subDivisionIndex,
            "Section": sectionIndex,
            "Village": JSON.stringify(village)
        });
*/
    if(!village){

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
