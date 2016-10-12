var Mongodb = require('mongodb');
var Promise = require('promise');
var MongoClient = Mongodb.MongoClient;

var url = 'mongodb://localhost:27017/OFC';


function getconnection(){
	return new Promise(function (resolve,reject) {
		MongoClient.connect(url,function(err,connection){
			if(err){ console.log("error connection"+ url); reject(err); }
			else{console.log("success"); resolve(connection);}
		});
	});
	
}


function run (id,txt){
txt=new RegExp(txt);

getconnection().then(
	 function(connection){
		 var collection =connection.collection('coporate_informations');
		 collection.aggregate([
		   {$match:{"Corporate_ID":id}},
		   {$unwind:'$services'},
		   {$match:{$or:[
		                     {"services.type":{$regex:txt,"$options": "i"}},
		                     {"services.timeSpent":{$regex:txt,"$options": "i"}},
		                     {"services.trxID":{$regex:txt,"$options": "i"}},
		                     {"services.CustomerQuery":{$regex:txt,"$options": "i"}},
		                     {"services.ServiceProvided":{$regex:txt,"$options": "i"}},
		                     {"services.Category":{$regex:txt,"$options": "i"}},
		                     {"services.callTime":{$regex:txt,"$options": "i"}},
		                     {"services.ActualAmount":{$regex:txt,"$options": "i"}},
		                     {"services.FinalAmount":{$regex:txt,"$options": "i"}},
		                     {"services.DiscountRuppes":{$regex:txt,"$options": "i"}},
		                     {"services.DiscountPerctange":{$regex:txt,"$options": "i"}}                     
		                     ]}},
		     {"$group":{_id: null,"count":{$sum: 1 }}
		                            }
		   //{$unwind:"$services"},
		  // {$project:{"service":"$services"}} 		     			 
		 ],function(err,service){
			 connection.close();
			 if(err){ console.log("++err"+err);}
             //err && res.status(400).send(err) || res.status(200).send(result);
			 else {console.log(service);}	
		 });
		 
	 },
     function(err) {
        // res.status(400).send(err);
		 console.log("++error"+err);
     });
}

run('LOG9001','4');

var util = require('util');
process.stdin.setEncoding('utf-8');
process.stdin.on('data',function(text){
	console.log("test Entered: "+ text);		
});