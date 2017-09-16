var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');

//var db = mongojs('dbelectricals', ['colProjectDetails']);
var db = mongojs('mongodb://jagadish:12345@ds145303.mlab.com:45303/dbelectricals', ['colProjectDetails']);

router.put('/division/:id', function(req, res, next){

    var division = req.body;

    const divisionIndex = (parseInt(division._id) - 1);

    var setter = {};
    setter['Divisions.'+divisionIndex] = division;

    if(!division){

        res.status(400);
        res.json({
            "error": "Bad Data"
        });
    }
    else{

      db.colProjectDetails.update({_id: mongojs.ObjectId(req.params.id)}, {$set: setter}, {}, function(err, data){

          if(err){
              res.send(err);
          }

          res.json(data);
      });
    }
});

module.exports = router;
