var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');

//var db = mongojs('dbelectricals', ['colMaterialStockEntries']);
var db = mongojs('mongodb://jagadish:12345@ds145303.mlab.com:45303/dbelectricals', ['colMaterialStockEntries']);

router.get('/materialstockentries', function(req, res, next){

    db.colMaterialStockEntries.find(function(err, data){

        if(err){
            res.send(err);
        }

        res.json(data);
    });
});

router.get('/materialstockentries/:idMaterial', function(req, res, next){

    db.colMaterialStockEntries.find({IdMaterial: req.params.idMaterial}, function(err, data){

        if(err){
            res.send(err);
        }

        res.json(data);
    });
});

router.post('/materialstockentry', function(req, res, next){

    var entry = req.body;

    db.colMaterialStockEntries.save(entry, function(err, data){

        if(err){
            res.send(err);
        }

        res.json(data);
    });
});

router.put('/materialstockentry/:id', function(req, res, next){

      var stock = req.body;
      var updatedEntry = {};

      //updatedEntry.IdProject = stock.IdProject;
      updatedEntry.IdMaterial = stock.IdMaterial;
      updatedEntry.IdSupervisor = stock.IdSupervisor;
      updatedEntry.IdDealer = stock.IdDealer;
      updatedEntry.TransactionDate = stock.TransactionDate;
      updatedEntry.TransactionDetails = stock.TransactionDetails;
      updatedEntry.MaterialReceived = stock.MaterialReceived;
      updatedEntry.MaterialIssued = stock.MaterialIssued;

      if(!updatedEntry){

          res.status(400);
          res.json({
              "error": "Bad Data"
          });
      }
      else{

        db.colMaterialStockEntries.update({_id: mongojs.ObjectId(req.params.id)}, updatedEntry, {}, function(err, data){

            if(err){
                res.send(err);
            }

            res.json(data);
        });
      }
});

router.delete('/materialstockentry/:id', function(req, res, next){

    db.colMaterialStockEntries.remove({_id: mongojs.ObjectId(req.params.id)}, function(err, data){

        if(err){
            res.send(err);
        }

        res.json(data);
    });
});

module.exports = router;
