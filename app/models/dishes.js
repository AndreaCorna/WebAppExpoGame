/*Import to be used in file*/
var mongoose = require('mongoose');
var db = require('./dbModels')
var translator = require('../libs/translator');

var handleError = function(error){
	//console.log(error);
	switch (error.name){
	    case 'ValidationError':
	      return 'All the fields are required!';
	      break;
	    default:
	      return 'There was an error submitting your data';
	      break;
    }
}

//function to retrieve the list of dishes
exports.getDishes = function(callback){
	db.modelDish.find({},function(err,list){
		var error = undefined;
		if(err){
			error = handleError(err);
		}
		callback(error,list);

	});
}

//function used to insert a new dish
exports.insertDish = function(name_,nationality_,imageUrl_, description_, ingredients, zone_,curiosity_,difficulty_,callback){
		console.log("inside insert dish")
		console.log(curiosity_)
		console.log(parseInt(difficulty_))

		db.modelDish.create({
		    name:name_,
			nationality:nationality_,
			imageUrl:imageUrl_,
			ingredients:ingredients,
			description:description_,
			zone:zone_,
			curiosity:curiosity_,
			difficulty:parseInt(difficulty_)

		},function(err, dish){
			var error = undefined;
		    if (err){
		    	error = handleError(err);
		  	}
		  	callback(error,dish)

		});


}

//function used to remove a dish from the database
exports.deleteDish = function(name,callback){
	db.modelDish.findOneAndRemove({name:name},callback);
}

