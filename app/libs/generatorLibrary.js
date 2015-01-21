var sqliteWriter = require('./SQLiteWriter');
var modelIngredients = require('../models/ingredients');
var modelMascots = require('../models/mascots');
var modelDishes = require('../models/dishes');
var async = require('async')

/*
function used to create the sqlite function. use module async in order to retrieve data from mongodb and
insert in the sqlite. the last function is called when every request returns
*/
var createSQLiteDatabase = function(){
	async.parallel([
		        function(callback){
		            modelIngredients.getIngredients(function(error,list){
		            	if(error){
							console.log(error);
						}else{

							ingredientsList = [];
							for (var i = list.length - 1; i >= 0; i--) {
								object = {"name":list[i]["name"],"imageUrl":list[i]["imageUrl"],"category":list[i]["category"]}
								ingredientsList.push(object);
							}

							callback(null,ingredientsList);

						}
						
		            });
		        },
		        function(callback){
		        	modelMascots.getMascots(function(list){
		        		mascotsList = [];
		        		for (var i = list.length - 1; i >= 0; i--) {
								object = {"category":list[i]["category"],"latitude":list[i]["latitude"],"longitude":list[i]["longitude"],"modelUrl":list[i]["modelUrl"],"name":list[i]["name"]}
								mascotsList.push(object);
							}
						callback(null,mascotsList)
		        	});
		        },
		        function(callback){
		            modelDishes.getDishes(function(error,list){
						if(error){
							console.log(error);
						}else{
							dishList = []
							for (var i = list.length - 1; i >= 0; i--) {
								object = {"name":list[i]["name"],"nationality":list[i]["nationality"],"imageUrl":list[i]["imageUrl"],"description":list[i]["description"],"zone":list[i]["zone"],"ingredients":list[i]["ingredients"]}
								dishList.push(object);
							}
							callback(null,dishList)
						}
					});
				}
				
		    ],
		    //call when functions before have terminated
			function(err, results){
				if(err){
					//here if AT LEAST one function fails
					console.log(err);
					return false;
				}else{
					//insert data on sqlite database, defined in sqlitewriter.js
					console.log("createSQLiteDatabase");
					sqliteWriter.insertData("locals",  results[0],results[1],results[2]);
					return true;
				}
		    });
	
	return true;
}

//used to create xml files
var createXmlFiles = function(){
	return true;
}


//function used to create the sqlite file for the application and the strings.xml files
exports.generateAppFiles = function(callback){
	var error = undefined;
	resultDatabase = createSQLiteDatabase();
	if(!resultDatabase){
		error = "Error creation database SQLite";
		callback(error,"all correct");

	}
	resultXml = createXmlFiles();
	if(!resultXml){
		error = "Error creation XML files";
		callback(error,"all correct");

	}
	callback(error,"all correct");


}