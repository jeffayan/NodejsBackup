'use strict';
'use esversion: 6';
const bcrypt=require('bcrypt');
const basic = require('hapi-auth-basic');
const hapi = require("hapi");
const inert=require('inert');
const good= require('good');
const server = new hapi.Server();

server.connection({port:'8000'});

const users={
		jeff:{
			username:'jeff',
			password:'jeff*123',
			name:'jeffAyan'
		}
};



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
},{
    register:basic	
}],err=>{
	if(err) 
		throw err; 
	
server.route({
	
	method:"get",
	path:'/{name}',
	handler: function (req,res){
		
		return res.file('./file.html');
	}
				
});
});
server.start((err)=>{
     if(err){
    	 throw err;
     }
     else console.log(`Server running at: ${server.info.uri}`);
  
});