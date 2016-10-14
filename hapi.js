'use strict';
'use esversion: 6';

const hapi = require("hapi");
const Path = require("path");
const inert=require('inert');
const good= require('good');
var delayed=require('delayed');
const Joi = require("Joi");
const vision = require('vision');
const server = new hapi.Server({
	cache:[{
		name:'mongoCache',
		engine:require('catbox-mongodb'),
		host:'172.16.19.120',
		partition:'cache'
	}],
		connections:{
			routes:{
				files:{
					relativeTo: Path.normalize("C:/Users/admin/Desktop")
				}
			}
		}
	
	
});
const add = function (a,b,next){
	return next(null,Number(a)+Number(b));
}


var getData= function () {
    const fortunes = [
        'Heisenberg may have slept here...',
        'Wanna buy a duck?',
        'Say no, then negotiate.',
        'Time and tide wait for no man.',
        'To teach is to learn.',
        'Never ask the barber if you need a haircut.',
        'You will forget that you ever knew me.',
        'You will be run over by a beer truck.',
        'Fortune favors the lucky.',
        'Have a nice day!'
    ];
    const x = Math.floor(Math.random() * fortunes.length);
    return fortunes[x];
};

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
},
{
	register:vision
	}

],err=>{
	if(err) 
		throw err; 
	

	server.views({
	    engines: {
	        html: require('handlebars')
	    },
	    relativeTo: __dirname,
	   
	});
	
server.route({
	
	method:"get",
	path:'/',
	handler: function (req,res){
		//console.log(process.argv[2]);
		 res.view('file');
		/*res('Hello').state('data', 'test', { encoding: 'none' });
		const id = req.params.a+':'+req.params.b;
		sumCache.get({id:id,a:req.params.a,b:req.params.b},(err,result)=>{
			if(err) return res(err);
			else {res(result);}
		});*/
		//const response = res({ be: 'hapi' });
		//console.log("edd "+req.params.ttl);
	//	var name="";
	    //function hh(){ for(var i=0;i<150000;i++){console.log(i); name="jeff";}}
	   /* hh();
		console.log("name "+JSON.stringify(req.params.namee));
		
		return res(name).header('mod',Date.toUTCString);*/
	},
	config:{

		validate: {
            query: {
                limit: Joi.number().integer().min(1).max(100).default(10)
            }
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