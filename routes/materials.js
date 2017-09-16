var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');

//var db = mongojs('dbelectricals', ['colMaterials']);
var db = mongojs('mongodb://jagadish:12345@ds145303.mlab.com:45303/dbelectricals', ['colMaterials']);

router.get('/materials', function(req, res, next){

    db.colMaterials.find(function(err, dataArray){

        if(err){
            res.send(err);
        }

        res.json(dataArray);
    });
});

router.get('/material/:id', function(req, res, next){

    db.colMaterials.findOne({_id: mongojs.ObjectId(req.params.id)}, function(err, data){

        if(err){
            res.send(err);
        }

        res.json(data);
    });
});

router.post('/material', function(req, res, next){

    var newMaterial = req.body;

    db.colMaterials.save(newMaterial, function(err, data){

        if(err){
            res.send(err);
        }

        res.json(data);
    });
});

router.delete('/material/:id', function(req, res, next){

    db.colMaterials.remove({_id: mongojs.ObjectId(req.params.id)}, function(err, data){

        if(err){
            res.send(err);
        }

        res.json(data);
    });
});

router.put('/material/:id', function(req, res, next){

    var material = req.body;
    var updatedMaterial = {};

    updatedMaterial.MaterialName = material.MaterialName;
    updatedMaterial.MeasurementUnit = material.MeasurementUnit;
    updatedMaterial.MaterialUsageCount = 0;

    if(!updatedMaterial){

        res.status(400);
        res.json({
            "error": "Bad Data"
        });
    }
    else{

      db.colMaterials.update({_id: mongojs.ObjectId(req.params.id)}, updatedMaterial, {}, function(err, data){

          if(err){
              res.send(err);
          }

          res.json(data);
      });
    }
});

module.exports = router;
