var express = require('express');
var router = express.Router();
var zoneModel = require('../models/zones')


router.post('/',function(req,res){
	var zone = req.body.zone;
	zoneModel.insertZone(zone,function(error,zone){
		if(error){
		 	res.render('zone', {
			    title: 'Zone Dish',
				error_message:error});

	    }
		console.log("Created dish "+zone);
    	res.redirect('/dishes');
	});
});

router.get('/new', function(req, res){
		res.render('zone', {
	    title: 'Zone Dish'});
  
});

module.exports = router;