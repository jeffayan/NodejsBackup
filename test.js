var Mongodb = require('mongodb');
var Promise = require('promise');
var MongoClient = Mongodb.MongoClient;
var http=require('http');
var $=require('jquery');
var url = 'mongodb://localhost:27017/OFC';
//var buf = Buffer("85e965",'hex');
//console.log(buf.toString('base64'));

/*var browserify = require('browserify');
var b = browserify();
b.add('C:/Users/admin/Documents/JeffWorkSpace/WorkSpace/demo/BackupServices/node_modules/express/lib/application.js');
//b.add('http');
//b.add('promise');
b.bundle().pipe(process.stdout);

console.log(__dirname);



http.createServer(function (req,res){
	$(window).click(function(){
		document.body.bgColor = 'red';
	})
	
}).listen(8082);
*/
function getConnection(){
	return new Promise(function (resolve,reject) {
		MongoClient.connect(url,function(err,connection){
			if(err){ console.log("error connection"+ url); reject(err); }
			else{console.log("success"); resolve(connection);}
		});
	});
	
}
function test(phoneNumber,searchKeys,limits,pageNumbers){

getconnection().then(
		 function(connection) {
   // console.log("User Searching Details: "+JSON.stringify(req.body));
  //  var limits=req.body.limit;
   // var pageNumbers=req.body.pageNumber;
   // var searchKeys=req.body.searchKey
  //  mongo_connection_manager.getConnection().then(function(connection) {
			 console.log("Phone :"+phoneNumber+"  searck Key:  "+searchKeys+"   Limits:  "+limits+"  Page Number :   "+pageNumbers);
        connection.collection('user_informations').aggregate([{
            $match:{"Phone Number": phoneNumber}},
            {$unwind:'$services'},
            {$project:{
                "type":{"$toLower":"$services.type"},
                "FinalAmount":{ "$toLower":"$services.FinalAmount"},
                "ActualAmount":{ "$toLower":"$services.ActualAmount"},
                "DiscountRuppes":{ "$toLower":"$services.DiscountRuppes"},
                "DiscountPerctange":{ "$toLower":"$services.DiscountPerctange"},
                "timeSpent":{ "$toLower":"$services.timeSpent"},
                "trxID":"$services.trxID"}},
            
                {"$match":{"$or":[
                                  {"type":{$regex:searchKeys,"$options": "i"}},
                                  {"timeSpent":{$regex:searchKeys,"$options": "i"}},
                                  {"trxID":{$regex:searchKeys,"$options": "i"}},
                                  {"ActualAmount":{$regex:searchKeys,"$options": "i"}},
                                  {"FinalAmount":{$regex:searchKeys,"$options": "i"}},
                                  {"DiscountRuppes":{$regex:searchKeys,"$options": "i"}},
                                  {"DiscountPerctange":{$regex:searchKeys,"$options": "i"}} 
                                  ]}},

             {$group:{'_id':null,'services':{$push:{'type':'$type','timeSpent':'$timeSpent',
                                                    'txtID':'$trxID','ActualAmount':'$ActualAmount',
                                                    'FinalAmount':'$FinalAmount','DiscountRuppes':'$DiscountRuppes',
                                                    'DiscountPerctange':'$DiscountPerctange'}}}},
             {$unwind:'$services'},
             {$sort:{"services.timeSpent":-1,"services.trxID":-1}},
            {$limit:limits*pageNumbers},{$skip:(limits*pageNumbers)-limits}]).toArray(function(err, result) {
           // res.send(result);
            	if(err){ console.log("+++Err",err);}
            	else{ console.log("User Searching Details limited result: "+JSON.stringify(result));}
        });
    //});
});
}
 

function test2(corporateId,searchKeys,limits,pageNumbers){
	
	getConnection().then(function(connection) {
        connection.collection('coporate_informations').aggregate([{
            $match:{"Corporate_ID":corporateId}},
            {$unwind:'$transationHistory'},
            {$project:{
            "transactionAmount":{ "$toLower":"$transationHistory.transactionAmount"},
            "transactionId":"$transationHistory.transactionId",
            "paymentId":"$transationHistory.paymentId",
            "transactionStatus":"$transationHistory.transactionStatus",
            "medium":"$transationHistory.medium",
            "transactionDate":"$transationHistory.transactionDate"}},
            {"$match":{"$or":[
            {"transactionAmount":{$regex:searchKeys,"$options": "i"}},
            {"transactionId":{$regex:searchKeys,"$options": "i"}},
            {"paymentId":{$regex:searchKeys,"$options": "i"}},
            {"transactionStatus":{$regex:searchKeys,"$options": "i"}},
            {"medium":{$regex:searchKeys,"$options": "i"}},
            {"transactionDate":{$regex:searchKeys,"$options": "i"}}]}},
            
            {"$group":{'_id':null,'transationHistory':{$push:{
            'transactionAmount':'$transactionAmount',
            'transactionId':'$transactionId',
            'paymentId':'$paymentId',
            'transactionStatus':'$transactionStatus',
            'medium':'$medium',
            'transactionDate':'$transactionDate'}}}},
             {$unwind:'$transationHistory'},
             {$sort:{"transationHistory.transactionDate":-1}},
             {$limit:limits*pageNumbers},{$skip:(limits*pageNumbers)-limits}]).toArray(function(err, result) {
            //res.send(result);
            if(err){
                console.log("err"+err);}
            console.log("corporate transaction Details of limited result: "+JSON.stringify(result));
        });
    });}
	 

function test3(corporateId,searchKeys,limits,pageNumbers){

	getConnection().then(function(connection) {
        connection.collection('coporate_informations').aggregate([{
            $match:{"Corporate_ID":corporateId}},
            {$unwind:'$services'},
            {$project:{
            "type":"$services.type",
            "timeSpent":"$services.timeSpent",
            "trxID":"$services.trxID",
            "FinalAmount":{ "$toLower":"$services.FinalAmount"},
            "ActualAmount":{ "$toLower":"$services.ActualAmount"},
            "DiscountRuppes":{ "$toLower":"$services.DiscountRuppes"},
            "callTime":"$services.callTime"}},
            {"$match":{"$or":[
            {"type":{$regex:searchKeys,"$options": "i"}},
            {"timeSpent":{$regex:searchKeys,"$options": "i"}},
            {"trxID":{$regex:searchKeys,"$options": "i"}},
            {"ActualAmount":{$regex:searchKeys,"$options": "i"}},
            {"FinalAmount":{$regex:searchKeys,"$options": "i"}},
            {"DiscountRuppes":{$regex:searchKeys,"$options": "i"}},
            {"DiscountPerctange":{$regex:searchKeys,"$options": "i"}},
            {"callTime":{$regex:searchKeys,"$options": "i"}} 
            ]}},
            {"$group":{'_id':null,'services':{$push:{'type':'$type','timeSpent':'$timeSpent',
                                                    'trxID':'$trxID','ActualAmount':'$ActualAmount',
                                                    'FinalAmount':'$FinalAmount','DiscountRuppes':'$DiscountRuppes',
                                                    'DiscountPerctange':'$DiscountPerctange','callTime':'$callTime'}}}},
             {$unwind:'$services'},
             {$sort:{"services.callTime":-1,"services.trxID":-1}},
             {$limit:limits*pageNumbers},{$skip:(limits*pageNumbers)-limits}]).toArray(function(err, result) {
           // res.send(result);
            console.log("corporate Searching Details limited result: "+JSON.stringify(result));
        });
    });
	
	
	
}

test3('LOG9001','100',5,1);
//test('9159571195','f','5','1');