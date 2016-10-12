var Mongodb = require('mongodb');
var Promise = require('promise');
var express=require('express');
var app = express();
var MongoClient = Mongodb.MongoClient;
var bodyParser=require("body-parser");
var url = 'mongodb://localhost:27017/OFC';


function getConnection(){
	return new Promise(function (resolve,reject) {
		MongoClient.connect(url,function(err,connection){
			if(err){ console.log("error connection"+ url); reject(err); }
			else{console.log("success"); resolve(connection);}
		});
	});
	
}


function run (id,searchKeys){


	 console.log("Phone :"+id+"  searck Key:  "+searchKeys);

	getConnection().then(function(connection) {
	        connection.collection('user_informations').aggregate([{
	            $match:{"Phone Number": id}},
	            {$unwind:'$services'},
	            {$project:{
	            	"type":"$services.type",
	            	"timeSpent":"$services.timeSpent",
	            	"trxID":"$services.trxID",
	            	"ActualAmount":{ "$toLower":"$services.ActualAmount"},
	            	"FinalAmount":{ "$toLower":"$services.FinalAmount"},
	            	"DiscountRuppes":{ "$toLower":"$services.DiscountRuppes"},
	            	"DiscountPerctange":{ "$toLower":"$services.DiscountPerctange"}	            
	                }},
	            {"$match":{"$or":[
	            {"type":{$regex:searchKeys,"$options":"i"}},
	            {"timeSpent":{$regex:searchKeys,"$options":"i"}},
	            {"trxID":{$regex:searchKeys,"$options":"i"}},
	            {"ActualAmount":{$regex:searchKeys,"$options":"i"}},
	            {"FinalAmount":{$regex:searchKeys,"$options":"i"}},
	            {"DiscountRuppes":{$regex:searchKeys,"$options":"i"}},
	            {"DiscountPerctange":{$regex:searchKeys,"$options":"i"}}  
	            ]}},
	            {"$group":{ _id: null,"count":{$sum: 1 }}}],(function(err, result) {
	          //  res.send(result);
	            	if(err) {console.log("Error "+ err);}
	            console.log("Results for User Service Search count : "+JSON.stringify(result));
	        }));
	    });
}



function cop_tranHis_run(id,txt){
	
	console.log("cop tranHis "+txt);	

	getConnection().then(
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


	function user_tranHis_run(id,txt){
	
		console.log("user TranHis "+txt);
	
		getConnection().then(
			 function(connection){
				 var collection =connection.collection('user_informations');
				 collection.aggregate([
				   {
		            $match:{"Phone Number": id}},
		            {$unwind:'$transationHistory'},
		            {$project:{
		            "transactionAmount":{$toLower:"$transationHistory.transactionAmount"},
		            "transactionId":"$transationHistory.transactionId",
		            "paymentId":"$transationHistory.paymentId",
		            "transactionStatus":"$transationHistory.transactionStatus",
		            "medium":"$transationHistory.medium",
		            "comments":"$transationHistory.comments",
		            }},
		            {"$match":{"$or":[
		            {"transactionAmount":{$regex:txt,"$options": "ix"}},
		            {"transactionId":{$regex:txt,"$options": "ix"}},
		            {"paymentId":{$regex:txt,"$options": "ix"}},
		            {"transactionStatus":{$regex:txt,"$options": "xi"}},
		            {"medium":{$regex:txt,"$options": "ix"}},
		            {"comments":{$regex:txt,"$options": "ix"}}
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

	
function copCheck(id,searchKeys){
	
	getConnection().then(function(connection) {
        connection.collection('coporate_informations').aggregate([{
           $match:{"Corporate_ID":id}},
           {$unwind:'$services'},
           {$project:{
            "type":"$services.type",
            "timeSpent":"$services.timeSpent",
            "trxID":"$services.trxID",
            "ActualAmount":{ "$toLower":"$services.ActualAmount"},
            "FinalAmount":{ "$toLower":"$services.FinalAmount"},
            "DiscountRuppes":{ "$toLower":"$services.DiscountRuppes"},
            "DiscountPerctange":{ "$toLower":"$services.DiscountPerctange"}            
               }},
           {"$match":{"$or":[
           {"type":{$regex:searchKeys,"$options":"i"}},
           {"timeSpent":{$regex:searchKeys,"$options":"i"}},
           {"trxID":{$regex:searchKeys,"$options":"i"}},
           {"ActualAmount":{$regex:searchKeys,"$options":"i"}},
           {"FinalAmount":{$regex:searchKeys,"$options":"i"}},
           {"DiscountRuppes":{$regex:searchKeys,"$options":"i"}},
           {"DiscountPerctange":{$regex:searchKeys,"$options":"i"}}  
           ]}},
           {"$group":{ _id: null,"count":{$sum: 1 }}}]).toArray(function(err, result) {
         //   res.send(result);
            console.log("Results for coporate_informations Service Search count : "+JSON.stringify(result));
        });
    });
	
	
}	
	
	
/*app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.post('/get',function(req,res){
     console.log(req.body);
     var bb= JSON.stringify(req.body.ph);
     console.log(bb);
	var bdy=JSON.parse(req.body);
	var bb= req.body.ph;
	
	run(bdy.ph, bdy.sk, bdy.li,bdy.pn)
	res.send(req.bdy);
});

app.listen(8081,function(){
	console.log("Running");
})*/
copCheck('LOG9001','2000');
//user_tranHis_run("9159571195", "payumoney");
