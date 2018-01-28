var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');

//var db = mongojs('dbelectricals', ['colOldMeterImages']);
var db = mongojs('mongodb://jagadish:12345@ds145303.mlab.com:45303/dbelectricals', ['colOldMeterImages']);

router.get('/oldmeterimages', function(req, res, next){

    db.colOldMeterImages.find(function(err, data){

        if(err){
            res.send(err);
        }

        res.json(data);
    });
});

router.get('/oldmeterimages/:idProject', function(req, res, next){

    db.colOldMeterImages.find({IdProject: req.params.idProject}, function(err, data){

        if(err){
            res.send(err);
        }

        res.json(data);
    });
});

router.get('/oldmeterimage/:rrnumber', function(req, res, next){

    db.colOldMeterImages.findOne({RRNumber: req.params.rrnumber}, function(err, data){

        if(err){
            res.send(err);
        }

        res.json(data);
    });
});

router.post('/oldmeterimage', function(req, res, next){

    var image = req.body;

    db.colOldMeterImages.save(image, function(err, data){

        if(err){
            res.send(err);
        }

        res.json(data);
    });
});

router.put('/oldmeterimage/:id', function(req, res, next){

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

        db.colOldMeterImages.update({_id: mongojs.ObjectId(req.params.id)}, updatedImage, {}, function(err, data){

            if(err){
                res.send(err);
            }

            res.json(data);
        });
      }
});

router.delete('/oldmeterimage/:id', function(req, res, next){

    db.colOldMeterImages.remove({_id: mongojs.ObjectId(req.params.id)}, function(err, data){

        if(err){
            res.send(err);
        }

        res.json(data);
    });
});

module.exports = router;
