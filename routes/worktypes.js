var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');

//var db = mongojs('dbelectricals', ['colWorkTypes']);
var db = mongojs('mongodb://jagadish:12345@ds145303.mlab.com:45303/dbelectricals', ['colWorkTypes']);

router.get('/worktypes', function(req, res, next){

    db.colWorkTypes.find(function(err, dataArray){

        if(err){
            res.send(err);
        }

        res.json(dataArray);
    });
});

router.get('/worktype/:id', function(req, res, next){

    db.colWorkTypes.findOne({_id: mongojs.ObjectId(req.params.id)}, function(err, data){

        if(err){
            res.send(err);
        }

        res.json(data);
    });
});

router.post('/worktype', function(req, res, next){

    var newWorkType = req.body;

    db.colWorkTypes.save(newWorkType, function(err, data){

        if(err){
            res.send(err);
        }

        res.json(data);
    });
});

router.delete('/worktype/:id', function(req, res, next){

    db.colWorkTypes.remove({_id: mongojs.ObjectId(req.params.id)}, function(err, data){

        if(err){
            res.send(err);
        }

        res.json(data);
    });
});

router.put('/worktype/:id', function(req, res, next){

    var worktype = req.body;
    var updatedWorkType = {};

    updatedWorkType.WorkTypeName = worktype.WorkTypeName;
    updatedWorkType.CostPerUnit = worktype.CostPerUnit;
    updatedWorkType.SupervisorCostPerUnit = worktype.SupervisorCostPerUnit;
    updatedWorkType.LabourCostPerUnit = worktype.LabourCostPerUnit;

    if(!updatedWorkType){

        res.status(400);
        res.json({
            "error": "Bad Data"
        });
    }
    else{

      db.colWorkTypes.update({_id: mongojs.ObjectId(req.params.id)}, updatedWorkType, {}, function(err, data){

          if(err){
              res.send(err);
          }

          res.json(data);
      });
    }
});

module.exports = router;
