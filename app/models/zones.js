var mongoose = require('mongoose');
var db = require('./dbModels')
var translator = require('../libs/translator');

var handleError = function(error){
	console.log(error);
}

exports.insertZone = function(zone_,callback){
	var zoneEnglish;
	var params = {text: zone_, from: 'it', to: 'en'};
	translator.translate(params,function(translation){
		zoneEnglish = translation;
		db.modelZone.create({
		zones:[{zone:zone_,country:"it"},{zone:zoneEnglish,country:'en'}]
		},function(err,zone){
			var error = undefined;
			if(err){
				error = handleError(err);
			}
			callback(error,zone);
		});
		
	});
	
}

exports.getZones = function(callback){
	db.modelZone.find({},function(err,list){
		var error = undefined;
		var zoneList = []
		if(err){
			error = handleError(err);
		}else{
			for (var i = list.length - 1; i >= 0; i--) {
				zoneList.push(list[i]['zones'][0]['zone'])
			};
			
		}
		callback(error,zoneList);
	});
}