var express = require('express');
var multer  = require('multer');
var router = express.Router();
var multer  = require('multer')
var mascotsModel = require('../models/mascots')

// Handle the upload of the files for the mascots
var mascotsUploader = multer({
        dest: './public/upload/mascots',
        rename: function (fieldname, filename) {
            return filename
            }
});

/* GET /mascots: List the mascots. */
router.get('/', function(req, res){
  mascotsModel.getMascots(function(mascots){
    console.log('returned mascots '+mascots);

    res.render('mascots/mascots', {
    title: 'Mascots',
    mascots: mascots
    });

  });
});



  /* DELETE /mascots */
router.delete('/:id', function(req, res){
  console.log("Deleting mascotte "+req.params.id);
  mascotsModel.deleteMascot(req.params.id,function(){
    res.send("ok");
  })


  });


/* POST /mascots:  Routes which handle the creation of a Mascot */
router.post('/',mascotsUploader,function(req,res){
  var category = req.body.category;
  var latitude = req.body.latitude;
  var longitude = req.body.longitude;
  var image = req.files.image.name;
  var modelUrl = req.files.modelUrl.name;

  var name = req.body.name;


  console.log(req.files.image);
  console.log(req.files.image.name);



  console.log('[MascotsRoutes>post]Mascot created:\ncategory '+category+' \nlatitude '+latitude+' \nlongitude '+longitude+' \nimage '+image+' \nname '+name);
  //Save mascots in the model by passing all the parameters
  mascotsModel.createMascot(name,category, latitude, longitude, image,modelUrl,function(error,mascot){

    //displaying error message which comes from the model validation
    if(error){
        res.render('/mascots/new_mascot', {
          title: 'Create Mascot',
          error_message: error
        });
        return;
    }

    console.log('created'+mascot);
    console.log('createdswqsqwsq');

    res.redirect('/mascots');

  });


});



/* GET /mascots/new show the form for creating a mascot */
router.get('/new', function(req, res){
    res.render('mascots/new_mascot', {
    title: 'Create Mascot'});
});


/* GET /mascots/new show the form for creating a mascot */
router.get('/:id/edit', function(req, res){
  console.log("called edit")
  mascotsModel.getMascot(req.params.id,function(mascot){


    res.render('mascots/edit_mascot', {
      title: 'Edit Mascot',
      mascot: mascot
      });
    });

  });

//POST /:id/edit/ edit the latitude and the longitude of a mascot
router.post("/:id/edit",function(req,res){
  var name = req.params.id
  var lat = req.body.latitude;
  var lng = req.body.longitude;
//updating the model with the new information
  mascotsModel.updateMascot(name,lat,lng,function(error){
      console.log("after update in routes edit");
      if(error){
        mascotsModel.getMascot(name,function(mascot){
          res.render('/mascots/edit_mascot', {
          title: 'Edit Mascot',
          error_message: error,
          mascot:mascot
          });
        return;
      });

    }
    console.log('updated Mascot');
    res.redirect("/mascots");

  });
});




module.exports = router;
