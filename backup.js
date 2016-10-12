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

//d= "^-?\d+(,\d+)*(\.\d+(e\d+)?)?$";

//txt="^-?\\"+txt+"+(,\\"+txt+"+)*(\\.\\"+txt+"+(e\\"+txt+"+)?)?$";

console.log("txt==========="+txt);

getconnection().then(
	 function(connection){
		 var collection =connection.collection('user_informations');
        // var dat = String();
		 collection.aggregate([
		   {
            $match:{"Phone Number": id}},
            {$unwind:'$transationHistory'},
       /*     {$project:{
            "transactionAmount":String("$transationHistory.transactionAmount"),
            "transactionId":String("$transationHistory.transactionId"),
            "paymentId":String("$transationHistory.paymentId"),
            "transactionStatus":String("$transationHistory.transactionStatus"),
            "medium":String("$transationHistory.medium"),
            "comments":String("$transationHistory.comments")         	            	
            }},*/
            {"$match":{"$or":[
            {"transationHistory.transactionAmount":{$eq:Number(txt)}},
            {"transationHistory.transactionId":{$regex:txt,"$options": "ix"}},
            {"transationHistory.paymentId":{$regex:txt,"$options": "ix"}},
            {"transationHistory.transactionStatus":{$regex:txt,"$options": "xi"}},
            {"transationHistory.medium":{$regex:txt,"$options": "ix"}},
            {"transationHistory.comments":{$regex:txt,"$options": "ix"}}
            ]}},
		    {"$group":{_id: null, "result":{$push:"$transationHistory"},"count":{$sum: 1 }}}
		                            
		   //{$unwind:"$services"},
		  // {$project:{"service":"$services"}} 		     			 
		 ],function(err,service){
			 connection.close();
			 if(err){ console.log("++err"+err);}
             //err && res.status(400).send(err) || res.status(200).send(result);
			 else {console.log(JSON.stringify(service));}	
		 });
		 
	 },
     function(err) {
        // res.status(400).send(err);
		 console.log("++error"+err);
     });
}

run('9159571195','25');
var util = require('util');
process.stdin.setEncoding('utf-8');
process.stdin.on('data',function(text){
	console.log("text Entered: "+ text);		
});
