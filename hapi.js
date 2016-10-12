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

const validate = function(request,username,password,callback){
	const user = users[username];
	if(!user)
		{
			callback(null,false);
		}
	bcrypt.compare(password,user.password,(err,isValid) => {
		callback(err,isValid,{name:user.name});
	});
	
	
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
	server.auth.strategy("simple", "basic",{validateFunc:validate});
server.route({
	
	method:"get",
	path:'/',
	config:{
		  auth:'simple',
		  handler: function (req,res){
		 console.warn("Hello"+req.auth.credentials.name);
		return res("Hello"+req.auth.credentials.name);
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