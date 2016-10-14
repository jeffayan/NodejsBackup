/*var fullText ="hello";
var g ="hel";

fullText=fullText.replace(g,g+',').split(',');

console.log(fullText);*/


/*var fullText ="hellohello";
var givenCharacters ="hel";
var output = fullText.split( givenCharacters ).map( function(item, index, arr){ 
	console.log("item:"+item+"  index:"+index+"   arr:"+arr);
    if ( index == arr.length - 1 ) 
    { 
      return item; 
    } 
    else
    { 
      return item + givenCharacters  
    } 
});AIzaSyBP4rAhmyVSoH9sDfwhUPssNSlz6jX9ptM



console.log( output );*/



var timezone = require('node-google-timezone');
 
var timestamp = 1402629305; 
// time as seconds since midnight, January 1, 1970 UTC 
 
console.log(new Date(timestamp * 1000));
// => Fri Jun 13 2014 00:15:05 GMT-0300 (BRT) 
 
// somewhere in New York 
var lat = 15.650407, 
    lng = 101.672417;
 
//timezone.key('YOUR API KEY HERE'); // optional 
 
//timezone.language('es'); // optional: default 'en' 
 
timezone.data(lat, lng, timestamp, function (err, tz) {
 
  console.log(tz.raw_response);
  //=> { dstOffset: 3600, 
  //     rawOffset: -18000, 
  //     status: 'OK', 
  //     timeZoneId: 'America/New_York', 
  //     timeZoneName: 'Eastern Daylight Time' } 
 
  console.log(tz.local_timestamp);
  // => 1402614905 
 
  var d = new Date(tz.local_timestamp * 1000);
 
  console.log(d.toDateString() + ' - ' + d.getHours() + ':' + d.getMinutes());
  // => Thu Jun 12 2014 - 20:15 
 
});
