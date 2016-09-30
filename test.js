var go;
var http = require('http');
http.createServer(function(req,res){
	req.on('data',function(data){
		go='';
		go+=data;
	}).on('end',function(){
		res.writeHead(200, "Content-Type:plain/text");
		res.write(
		'<html>'+
		'<head>'+
		'<meta charset = "utf-8"/>'+
		'<title>New page</title>'+
		'</head>'+
		'<body>'+
		'Hello da'+
		'</body>'+
		'</html>'
		);
		res.end('End');
		console.log("data entered  "+ go);
	});
	
	
}).listen(8000);