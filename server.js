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
	pingAllSubscribers();
}); 
//Utility Function
function pingAllSubscribers(){
	console.log("function reached =-=-=-=-=-");   
	request('http://www.unisoundlive.com/ping', function (error, response, body) {
		console.log(response.toString().length);
	});
}
//Interval
setInterval(function(){ pingAllSubscribers();}, 900000);
//Port Settings
app.set('port', (process.env.PORT || 5000));
http.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
