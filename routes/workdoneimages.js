var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');

//var db = mongojs('dbelectricals', ['colWorkdoneImages']);
var db = mongojs('mongodb://jagadish:12345@ds145303.mlab.com:45303/dbelectricals', ['colWorkdoneImages']);

router.get('/workdoneimages', function(req, res, next){

    db.colWorkdoneImages.find(function(err, data){

        if(err){
            res.send(err);
        }

        res.json(data);
    });
});

router.get('/workdoneimages/:idProject', function(req, res, next){

    db.colWorkdoneImages.find({IdProject: req.params.idProject}, function(err, data){

        if(err){
            res.send(err);
        }

        res.json(data);
    });
});

router.get('/workdoneimage/:rrnumber', function(req, res, next){

    db.colWorkdoneImages.findOne({RRNumber: req.params.rrnumber}, function(err, data){

        if(err){
            res.send(err);
        }

        res.json(data);
    });
});

router.post('/workdoneimage', function(req, res, next){

    var image = req.body;

    db.colWorkdoneImages.save(image, function(err, data){

        if(err){
            res.send(err);
        }

        res.json(data);
    });
});

router.put('/workdoneimage/:id', function(req, res, next){

      var image = req.body;
      var updatedImage = {};

      updatedImage.IdProject = image.IdProject;
      updatedImage.RRNumber = image.RRNumber;
      updatedImage.Base64Image = image.Base64Image;

      if(!updatedImage){

          res.status(400);
          res.json({
              "error": "Bad Data"
          });
      }
      else{

        db.colWorkdoneImages.update({_id: mongojs.ObjectId(req.params.id)}, updatedImage, {}, function(err, data){

            if(err){
                res.send(err);
            }

            res.json(data);
        });
      }
});

router.delete('/workdoneimage/:id', function(req, res, next){

    db.colWorkdoneImages.remove({_id: mongojs.ObjectId(req.params.id)}, function(err, data){

        if(err){
            res.send(err);
        }

        res.json(data);
    });
});

module.exports = router;
