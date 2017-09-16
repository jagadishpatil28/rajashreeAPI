var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');

//var db = mongojs('dbelectricals', ['colEmployeeDetails']);
var db = mongojs('mongodb://jagadish:12345@ds145303.mlab.com:45303/dbelectricals', ['colEmployeeDetails']);

router.get('/labours', function(req, res, next){

    db.colEmployeeDetails.find({}, {RegisteredLabours: 1}, function(err, dataArray){

        if(err){
            res.send(err);
        }

        res.json(dataArray);
    });
});


router.get('/labour/:id', function(req, res, next){

    db.colEmployeeDetails.findOne({_id: mongojs.ObjectId(req.params.id)}, function(err, data){

        if(err){
            res.send(err);
        }

        res.json(data);
    });
});


router.post('/labour', function(req, res, next){

    var newLabour = req.body;

    db.colEmployeeDetails.save(newLabour, function(err, emp){

        if(err){
            res.send(err);
        }

        res.json(emp);
    });
});

router.delete('/labour/:id', function(req, res, next){

    db.colEmployeeDetails.remove({_id: mongojs.ObjectId(req.params.id)}, function(err, data){

        if(err){
            res.send(err);
        }

        res.json(data);
    });
});


router.put('/labour/:idSupervisor', function(req, res, next){

    var labour = req.body;
    var updatedLabour = {};

    updatedLabour.LabourCode = labour.LabourCode;
    updatedLabour.LabourName = labour.LabourName;
    updatedLabour.PhoneNumber = labour.PhoneNumber;
    updatedLabour.Address = labour.Address;
    updatedLabour.Password = labour.Password;
    updatedLabour.WorkingStatus = labour.WorkingStatus;
    updatedLabour.RegistrationDate = labour.RegistrationDate;

    const labourIndex = parseInt(req.query['labourIndex']);

    var setter = {};
    setter['RegisteredLabours.'+labourIndex] = updatedLabour;

    if(!updatedLabour){

        res.status(400);
        res.json({
            "error": "Bad Data"
        });
    }
    else{

      db.colEmployeeDetails.update({_id: mongojs.ObjectId(req.params.idSupervisor)}, {$set: setter}, {}, function(err, data){

          if(err){
              res.send(err);
          }

          res.json(data);
      });
    }
});

module.exports = router;
