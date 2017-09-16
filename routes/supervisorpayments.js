var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');

//var db = mongojs('dbelectricals', ['colSupervisorPayments']);
var db = mongojs('mongodb://jagadish:12345@ds145303.mlab.com:45303/dbelectricals', ['colSupervisorPayments']);

router.get('/supervisorpayments', function(req, res, next){

    db.colSupervisorPayments.find(function(err, data){

        if(err){
            res.send(err);
        }

        res.json(data);
    });
});

router.get('/supervisorpayments/:idProject', function(req, res, next){

    db.colSupervisorPayments.find({IdProject: req.params.idProject}, function(err, data){

        if(err){
            res.send(err);
        }

        res.json(data);
    });
});

router.post('/supervisorpayment', function(req, res, next){

    var entry = req.body;

    db.colSupervisorPayments.save(entry, function(err, data){

        if(err){
            res.send(err);
        }

        res.json(data);
    });
});

router.put('/supervisorpayment/:id', function(req, res, next){

      var payment = req.body;
      var updatedPayment = {};

      updatedPayment.IdProject = payment.IdProject;
      updatedPayment.IdSupervisor = payment.IdSupervisor;
      updatedPayment.AmountPaid = payment.AmountPaid;
      updatedPayment.PaymentDetails = payment.PaymentDetails;
      updatedPayment.PaymentMode = payment.PaymentMode;
      updatedPayment.PaymentDate = payment.PaymentDate;

      if(!updatedPayment){

          res.status(400);
          res.json({
              "error": "Bad Data"
          });
      }
      else{

        db.colSupervisorPayments.update({_id: mongojs.ObjectId(req.params.id)}, updatedPayment, {}, function(err, data){

            if(err){
                res.send(err);
            }

            res.json(data);
        });
      }
});

router.delete('/supervisorpayment/:id', function(req, res, next){

    db.colSupervisorPayments.remove({_id: mongojs.ObjectId(req.params.id)}, function(err, data){

        if(err){
            res.send(err);
        }

        res.json(data);
    });
});

module.exports = router;
