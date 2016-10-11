//Environment Setup
var express = require('express');
var app = express();
var request = require("request");
var http = require('http').Server(app);
//Heroku Node Setup
app.use(express.static(__dirname + ''));
app.set('views', __dirname + '');
app.set('view engine', 'html');
//API
app.get('/', function(request, response) {
	console.log("Main/");
	pingAllSubscribers();
	response.sendFile(__dirname + '/index.html');
}); 
app.get('/ping', function (req, res) { 
	console.log("Long Live MASTER!!!!");
	res.status(200).send("My Son is good!");
}); 
app.get('/stopPING', function (req, res) { 
	status = false;
	for(var x = 0;x < 10;x++)
	console.log("Stopped by RESTFUL stopPING");
	res.status(200).send("Bye!!");
}); 
//Utility Function
function pingAllSubscribers(){
	if(status != true) return;
	console.log("Ditributing PING =-=-=-=-=-");  
	for(var x = 0 ;x < slaves.length;x++){
		request(slaves[x], function (error, response, body) { 
			if(response !=undefined)	console.log(response.toString().length);
			else console.log("Response is Undefined");
		});
	}
}
//Slave List
var status = true;
var slaves = ["http://www.unisoundlive.com/ping","http://www.survivalgameonline.com/ping"];
//Interval
setInterval(function(){ pingAllSubscribers();}, 1740 * 1000);
//Port Settings
app.set('port', (process.env.PORT || 1000));
http.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
