var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');

//var db = mongojs('dbelectricals', ['colWorkdoneEntries']);
var db = mongojs('mongodb://jagadish:12345@ds145303.mlab.com:45303/dbelectricals', ['colWorkdoneEntries']);

router.get('/workdoneentries', function(req, res, next){

    db.colWorkdoneEntries.find(function(err, data){

        if(err){
            res.send(err);
        }

        res.json(data);
    });
});

router.get('/workdoneentries/:idProject', function(req, res, next){

    db.colWorkdoneEntries.find({IdProject: req.params.idProject}, function(err, data){

        if(err){
            res.send(err);
        }

        res.json(data);
    });
});

router.post('/workdoneentry', function(req, res, next){

    var entry = req.body;

    db.colWorkdoneEntries.save(entry, function(err, data){

        if(err){
            res.send(err);
        }

        res.json(data);
    });
});

router.put('/workdoneentry/:id', function(req, res, next){

      var work = req.body;
      var updatedWork = {};

      updatedWork.LabourCode = work.LabourCode;
      updatedWork.IdSupervisor = work.IdSupervisor;
      updatedWork.IdProject = work.IdProject;
      updatedWork.IdDivision = work.IdDivision;
      updatedWork.IdSubDivision = work.IdSubDivision;
      updatedWork.IdSection = work.IdSection;
      updatedWork.IdVillage = work.IdVillage;
      updatedWork.RRNumber = work.RRNumber;
      updatedWork.InstallationDate = work.InstallationDate;

      updatedWork.IdWorkType = work.IdWorkType;
      updatedWork.ProtectionBoxStatus = work.ProtectionBoxStatus;
      updatedWork.MeterReturnedToSupervisor = work.MeterReturnedToSupervisor;
      updatedWork.MeterReturnedToStore = work.MeterReturnedToStore;
      updatedWork.MeterReturnedToDepartment = work.MeterReturnedToDepartment;
      updatedWork.OldMeterSerialNumber = work.OldMeterSerialNumber;
      updatedWork.Manufacturer = work.Manufacturer;
      updatedWork.Capacity = work.Capacity;
      updatedWork.FinalReading = work.FinalReading;
      updatedWork.NewMeterSerialNumber = work.NewMeterSerialNumber;
      updatedWork.InitialReading = work.InitialReading;
      updatedWork.MaterialsUsed = work.MaterialsUsed;

      if(!updatedWork){

          res.status(400);
          res.json({
              "error": "Bad Data"
          });
      }
      else{

        db.colWorkdoneEntries.update({_id: mongojs.ObjectId(req.params.id)}, updatedWork, {}, function(err, data){

            if(err){
                res.send(err);
            }

            res.json(data);
        });
      }
});

router.delete('/workdoneentry/:id', function(req, res, next){

    db.colWorkdoneEntries.remove({_id: mongojs.ObjectId(req.params.id)}, function(err, data){

        if(err){
            res.send(err);
        }

        res.json(data);
    });
});

module.exports = router;
