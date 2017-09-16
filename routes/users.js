var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');

//var db = mongojs('dbelectricals', ['colUserDetails']);
var db = mongojs('mongodb://jagadish:12345@ds145303.mlab.com:45303/dbelectricals', ['colUserDetails']);

router.get('/users', function(req, res, next){

    db.colUserDetails.find(function(err, dataArray){

        if(err){
            res.send(err);
        }

        res.json(dataArray);
    });
});

router.get('/user/:id', function(req, res, next){

    db.colUserDetails.findOne({_id: mongojs.ObjectId(req.params.id)}, function(err, data){

        if(err){
            res.send(err);
        }

        res.json(data);
    });
});

router.post('/user', function(req, res, next){

    var newUser = req.body;

    db.colUserDetails.save(newUser, function(err, data){

        if(err){
            res.send(err);
        }

        res.json(data);
    });
});

router.delete('/user/:id', function(req, res, next){

    db.colUserDetails.remove({_id: mongojs.ObjectId(req.params.id)}, function(err, data){

        if(err){
            res.send(err);
        }

        res.json(data);
    });
});

router.put('/user/:id', function(req, res, next){

    var user = req.body;
    var updatedUser = {};

    updatedUser.UserName = user.UserName;
    updatedUser.PhoneNumber = user.PhoneNumber;
    updatedUser.EMailId = user.EMailId;
    updatedUser.Password = user.Password;
    updatedUser.ActiveStatus = user.ActiveStatus;
    updatedUser.UserType = user.UserType;

    if(!updatedUser){

        res.status(400);
        res.json({
            "error": "Bad Data"
        });
    }
    else{

      db.colUserDetails.update({_id: mongojs.ObjectId(req.params.id)}, updatedUser, {}, function(err, data){

          if(err){
              res.send(err);
          }

          res.json(data);
      });
    }
});

module.exports = router;
