'use strict';
'use esversion: 6';

const hapi = require("hapi");
const inert=require('inert');
const good= require('good');
var delayed=require('delayed');
const server = new hapi.Server({
	cache:[{
		name:'mongoCache',
		engine:require('catbox-mongodb'),
		host:'172.16.19.120',
		partition:'cache'
	}]
	
});
const add = function (a,b,next){
	return next(null,Number(a)+Number(b));
}

const sumCache = server.cache({
	cache:'mongoCache',
	expiresIn:1000,
    segment:'customSegment',
    generateFunc: function (id,next){add(id.a,id.b,next);},
    generateTimeout: 100
});
server.connection({port:'8000'});

server.register([{
	register:good,
	options:{
		reporters:{
			console:[{
				module: 'good-squeeze',
				name:'Squeeze',
				args:[{
					response:'*',
					logs:'*'
				}]
			},
			  {
				module:'good-console'
			  },
			  'stdout'
			]
		}
	}
},{
	register:inert
}],err=>{
	if(err) 
		throw err; 
	
server.route({
	
	method:"get",
	path:'/{a}/{b}',
	handler: function (req,res){
		
		const id = req.params.a+':'+req.params.b;
		sumCache.get({id:id,a:req.params.a,b:req.params.b},(err,result)=>{
			if(err) return res(err);
			else {res(result);}
		});
		//const response = res({ be: 'hapi' });
		//console.log("edd "+req.params.ttl);
	//	var name="";
	    //function hh(){ for(var i=0;i<150000;i++){console.log(i); name="jeff";}}
	   /* hh();
		console.log("name "+JSON.stringify(req.params.namee));
		
		return res(name).header('mod',Date.toUTCString);*/
	},
	config:{
		cache:{
			expiresIn:5000,
			privacy:'private'
		}
	}
				
});
});
server.start((err)=>{
     if(err){
    	 throw err;
     }
     else console.log(`Server running at: ${server.info.uri}`);
  
});