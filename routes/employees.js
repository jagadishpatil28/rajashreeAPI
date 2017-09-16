var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');

//var db = mongojs('dbelectricals', ['colEmployeeDetails']);
var db = mongojs('mongodb://jagadish:12345@ds145303.mlab.com:45303/dbelectricals', ['colEmployeeDetails']);

//Get All the Employee Objects From the Document
router.get('/employees', function(req, res, next){

    //res.send('EMPLOYEES API');
    db.colEmployeeDetails.find(function(err, dataArray){

        if(err){
            res.send(err);
        }

        res.json(dataArray);
    });
});

//Get the Selected Employee Object From the Document
router.get('/employee/:id', function(req, res, next){

    //res.send('EMPLOYEES API');
    db.colEmployeeDetails.findOne({_id: mongojs.ObjectId(req.params.id)}, function(err, data){

        if(err){
            res.send(err);
        }

        res.json(data);
    });
});

//Save the New Employee Object Document
router.post('/employee', function(req, res, next){

    var emp = req.body;

    if(!emp.EmployeeCode || !emp.EmployeeName || !emp.PhoneNumber){

        res.status(400);
        res.json({
            "error": "Bad Data"
        });
    }
    else{
        db.colEmployeeDetails.save(emp, function(err, emp){

            if(err){
                res.send(err);
            }

            res.json(emp);
        });
    }
});

//Delete Selected Employees Object From the Document
router.delete('/employee/:id', function(req, res, next){

    db.colEmployeeDetails.remove({_id: mongojs.ObjectId(req.params.id)}, function(err, data){

        if(err){
            res.send(err);
        }

        res.json(data);
    });
});

//Update the Selected Employee Object From the Document
router.put('/employee/:id', function(req, res, next){

    var emp = req.body;
    var updatedEmp = {};

    updatedEmp.EmployeeCode = emp.EmployeeCode;
    updatedEmp.EmployeeName = emp.EmployeeName;
    updatedEmp.PhoneNumber = emp.PhoneNumber;
    updatedEmp.EMailId = emp.EMailId;
    updatedEmp.Password = emp.Password;
    updatedEmp.ActiveStatus = emp.ActiveStatus;
    updatedEmp.EmployeeType = emp.EmployeeType;
    updatedEmp.Villages = emp.Villages;
    updatedEmp.RegisteredLabours = emp.RegisteredLabours;

    if(!updatedEmp){

        res.status(400);
        res.json({
            "error": "Bad Data"
        });
    }
    else{

      db.colEmployeeDetails.update({_id: mongojs.ObjectId(req.params.id)}, updatedEmp, {}, function(err, data){

          if(err){
              res.send(err);
          }

          res.json(data);
      });
    }
});

module.exports = router;
