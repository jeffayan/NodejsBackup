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

     /*User_informations Collection Transaction History*/


function user_tranHis_run(id,txt){

console.log("user TranHis "+txt);

getconnection().then(
	 function(connection){
		 var collection =connection.collection('user_informations');
		 collection.aggregate([
		   {
            $match:{"Phone Number": id}},
            {$unwind:'$transationHistory'},
            {$project:{
            "transactionAmount":{$toLower:"$transationHistory.transactionAmount"}        	            	
            }},
            {"$match":{"$or":[
            {"transactionAmount":{$regex:txt,"$options": "ix"}},
            {"transationHistory.transactionId":{$regex:txt,"$options": "ix"}},
            {"transationHistory.paymentId":{$regex:txt,"$options": "ix"}},
            {"transationHistory.transactionStatus":{$regex:txt,"$options": "xi"}},
            {"transationHistory.medium":{$regex:txt,"$options": "ix"}},
            {"transationHistory.comments":{$regex:txt,"$options": "ix"}}
            ]}},
		    {"$group":{_id: null,"count":{$sum: 1 }}}    
		    		     			 
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

			/*User_informations Collection Services*/


function user_serv_run(id,txt){

	console.log("user Services "+txt);

	getconnection().then(
		 function(connection){
			 var collection =connection.collection('user_informations');
			 collection.aggregate([
			   {
	            $match:{"Phone Number": id}},
	            {$unwind:'$services'},
	            {$project:{
	            "ActualAmount":{$toLower:"$services.ActualAmount"},
	            "FinalAmount":{$toLower:"$services.FinalAmount"},
	            "DiscountPerctange":{$toLower:"$services.DiscountPerctange"},
	            "DiscountRuppes":{$toLower:"$services.DiscountRuppes"}		            
	            }},
	            {"$match":{"$or":[
	            {"services.type":{$regex:txt,"$options": "ix"}},
	            {"services.Category":{$regex:txt,"$options": "ix"}},
	            {"services.CustomerQuery":{$regex:txt,"$options": "ix"}},
	            {"services.ServiceProvided":{$regex:txt,"$options": "ix"}},
	            {"ActualAmount":{$regex:txt,"$options": "ix"}},
	            {"FinalAmount":{$regex:txt,"$options": "ix"}},
	            {"DiscountPerctange":{$regex:txt,"$options": "ix"}},
	            {"DiscountRuppes":{$regex:txt,"$options": "ix"}},
	            {"services.timeSpent":{$regex:txt,"$options": "ix"}},
	            {"services._serviceId":{$regex:txt,"$options": "ix"}},
	            {"services.trxID":{$regex:txt,"$options": "ix"}}	           
	            ]}},
			    {"$group":{_id: null,"count":{$sum: 1 }}}    
			    		     			 
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


							/*Coporate_informations Collection Services*/


function cop_serv_run(id,txt){
	console.log("cop Services "+txt);

	getconnection().then(
		 function(connection){
			 var collection =connection.collection('coporate_informations');
			 collection.aggregate([
			   {$match:{"Corporate_ID":id}},
			   {$unwind:'$services'},
			   {$project:{
		            "ActualAmount":{$toLower:"$services.ActualAmount"},
		            "FinalAmount":{$toLower:"$services.FinalAmount"},
		            "DiscountPerctange":{$toLower:"$services.DiscountPerctange"},
		            "DiscountRuppes":{$toLower:"$services.DiscountRuppes"}		            
		            }},
		       {"$match":{"$or":[
		            {"services.type":{$regex:txt,"$options": "ix"}},
		            {"services.Category":{$regex:txt,"$options": "ix"}},
		            {"services.CustomerQuery":{$regex:txt,"$options": "ix"}},
		            {"services.ServiceProvided":{$regex:txt,"$options": "ix"}},
		            {"ActualAmount":{$regex:txt,"$options": "ix"}},
		            {"FinalAmount":{$regex:txt,"$options": "ix"}},
		            {"DiscountPerctange":{$regex:txt,"$options": "ix"}},
		            {"DiscountRuppes":{$regex:txt,"$options": "ix"}},
		            {"services.timeSpent":{$regex:txt,"$options": "ix"}},
		            {"services._serviceId":{$regex:txt,"$options": "ix"}},
		            {"services.trxID":{$regex:txt,"$options": "ix"}}	           
		       ]}},
			     {"$group":{_id: null,"count":{$sum: 1 }}}			                            
		     			 
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



				/*Coporate_informations Collection transaction History*/

function cop_tranHis_run(id,txt){
	
	console.log("cop tranHis "+txt);	

	getconnection().then(
		 function(connection){
			 var collection =connection.collection('coporate_informations');
			 collection.aggregate([
			   {$match:{"Corporate_ID":id}},
			   {$unwind:'$transationHistory'},
	            {$project:{
	            	"transactionAmount":{$toLower:"$transationHistory.transactionAmount"}        	            	
	            }},
	            {"$match":{"$or":[
	                     {"transactionAmount":{$regex:txt,"$options": "ix"}},
	                     {"transationHistory.transactionId":{$regex:txt,"$options": "ix"}},
	                     {"transationHistory.paymentId":{$regex:txt,"$options": "ix"}},
	                     {"transationHistory.transactionStatus":{$regex:txt,"$options": "xi"}},
	                     {"transationHistory.medium":{$regex:txt,"$options": "ix"}},
	                     {"transationHistory.comments":{$regex:txt,"$options": "ix"}}
	            ]}},
			    {"$group":{_id: null,"count":{$sum: 1 }}}   
	            
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




user_tranHis_run('9159571195','500');
user_serv_run('9159571195','500');
cop_tranHis_run('LOG9001','500');
cop_serv_run('LOG9001','500');
/*var util = require('util');
process.stdin.setEncoding('utf-8');
process.stdin.on('data',function(text){
	console.log("text Entered: "+ text);		
});
*/