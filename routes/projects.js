var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');

//var db = mongojs('dbelectricals', ['colProjectDetails']);
var db = mongojs('mongodb://jagadish:12345@ds145303.mlab.com:45303/dbelectricals', ['colProjectDetails']);

router.get('/projects', function(req, res, next){

    db.colProjectDetails.find(function(err, dataArray){

    //db.colProjectDetails.find({_id: mongojs.ObjectId("5971f6eafaa77514a0641257"), "Divisions._id": 1}, {_id: 0, Divisions: {$elemMatch: {_id: 1}}}, function(err, dataArray){
        if(err){
            res.send(err);
        }

        res.json(dataArray);
    });
});

router.get('/project/:id', function(req, res, next){

    db.colProjectDetails.findOne({_id: mongojs.ObjectId(req.params.id)}, function(err, data){

        if(err){
            res.send(err);
        }

        res.json(data);
    });
});

router.post('/project', function(req, res, next){

    var newProject = req.body;

    db.colProjectDetails.save(newProject, function(err, data){

        if(err){
            res.send(err);
        }

        res.json(data);
    });
});

router.delete('/project/:id', function(req, res, next){

    db.colProjectDetails.remove({_id: mongojs.ObjectId(req.params.id)}, function(err, data){

        if(err){
            res.send(err);
        }

        res.json(data);
    });
});

router.put('/project/:id', function(req, res, next){

    var project = req.body;
    var updatedProject = {};

    updatedProject.ProjectType = project.ProjectType;
    updatedProject.ProjectCode = project.ProjectCode;
    updatedProject.ProjectName = project.ProjectName;
    updatedProject.WorkOrderNumber = project.WorkOrderNumber;
    updatedProject.Status = project.Status;
    updatedProject.StartDate = project.StartDate;
    updatedProject.CompletionDate = project.CompletionDate;
    updatedProject.Divisions = project.Divisions;

    if(!updatedProject){

        res.status(400);
        res.json({
            "error": "Bad Data"
        });
    }
    else{

      db.colProjectDetails.update({_id: mongojs.ObjectId(req.params.id)}, updatedProject, {}, function(err, data){

          if(err){
              res.send(err);
          }

          res.json(data);
      });
    }
});

module.exports = router;
