var Mongodb = require('mongodb');
var Promise = require('promise');
var MongoClient = Mongodb.MongoClient;
var url = 'mongodb://localhost:27017/OFC';
//var assert = require('assert');
var should = require('should');
function getconn (){	
	return new Promise(function(resolve, reject){
		MongoClient.connect(url,function(err,con){
			if(err){console.log(err);reject(err);}
			else {console.log('Success'); resolve(con);}
		});		
	});
}
 

var user= {
		name:"jeff",
		nick:["ayan","jeff"]
		
};
/*getconn().then(function(conn){	    
	console.log('Func');
		conn.collection('user_informations').find().toArray(function(err,res){
			if(err){console.log(err);}
			else{ console.log(res);}
			})
},function(err){
	console.log(err);
})
*/

/*function gt(a){ return a;}
	
const obj={
		a:{
		b:1
		}		
};*/
/*var num = 5;
should(num).be.exactly(4).and.be.a.Number();

should(user).have.property("name","jeff");
console.log("hello");
*/

/*var expect = require('chai').expect;
var foo="foo";
var exx={
		drink: ['aa','bb','cc']
};
var jas = require('jasmine');
var $= require('jquery');
var mocha = require('mocha');*/
 
 var mocha = require("mocha");
 var expect = require("chai").expect;
 
 before(function(){ console.log("before");});
 beforeEach(function(){ console.log("beforeEach");});
 afterEach(function(){ console.log("afterEach");});
 after(function(){ console.log("after");});
 
 describe("Testing..",function(){
	this.timeout(100);
	 
	 var aa=true;
	 var bb="aa";
	it("Test-1",function(done){
		expect(aa).to.be.a('boolean');		
	for(var i=0;i<10000;i++)  { console.log(i)} 
	done();
	});
	it("Test-2",function(){
		expect(aa).to.equal(false);
	});
	it("Test-3",function(){
		expect(bb).to.have.length(2);
	});
	
 }); 	
 

 
/* it('should return a new Array', function () {
 	console.log("it.only #slice 4");
 });*/
 
 
 
 
/*expect(foo).to.be.a('number');*/
/*expect(foo).to.equal('foo');
//expect(exx).to.have.property('drink').with.length(3);
console.log('success');*/
/*assert.notStrictEqual(1, '1');*/
/*assert.deepEqual(gt(10), gt(11),["Error"]);
Object.create(obj);*/