var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');

//var db = mongojs('dbelectricals', ['colDealerDetails']);
var db = mongojs('mongodb://jagadish:12345@ds145303.mlab.com:45303/dbelectricals', ['colDealerDetails']);

router.get('/dealers', function(req, res, next){

    db.colDealerDetails.find(function(err, dataArray){

        if(err){
            res.send(err);
        }

        res.json(dataArray);
    });
});

router.get('/dealer/:id', function(req, res, next){

    db.colDealerDetails.findOne({_id: mongojs.ObjectId(req.params.id)}, function(err, data){

        if(err){
            res.send(err);
        }

        res.json(data);
    });
});

router.post('/dealer', function(req, res, next){

    var newDealer = req.body;

    db.colDealerDetails.save(newDealer, function(err, data){

        if(err){
            res.send(err);
        }

        res.json(data);
    });
});

router.delete('/dealer/:id', function(req, res, next){

    db.colDealerDetails.remove({_id: mongojs.ObjectId(req.params.id)}, function(err, data){

        if(err){
            res.send(err);
        }

        res.json(data);
    });
});

router.put('/dealer/:id', function(req, res, next){

    var dealer = req.body;
    var updatedDealer = {};

    updatedDealer.DealerName = dealer.DealerName;
    updatedDealer.PhoneNumber = dealer.PhoneNumber;
    updatedDealer.EMailId = dealer.EMailId;
    updatedDealer.Address = dealer.Address;

    if(!updatedDealer){

        res.status(400);
        res.json({
            "error": "Bad Data"
        });
    }
    else{

      db.colDealerDetails.update({_id: mongojs.ObjectId(req.params.id)}, updatedDealer, {}, function(err, data){

          if(err){
              res.send(err);
          }

          res.json(data);
      });
    }
});

module.exports = router;
