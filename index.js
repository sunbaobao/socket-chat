var express=require("express");

var app = express();
var path=require("path");
var http = require('http').Server(app);
var io = require('socket.io')(http);
 app.use(express.static(path.join(__dirname,"public")));

/*
app.get('/', function(req, res){
    res.sendfile('./public/index.html');
});
*/

io.on('connection', function(socket){
    socket.on('chat message', function(msg){
        console.log('message: ' + msg);
        io.emit('chat message', msg)
    });
    /*socket.on('disconnect', function(){
        console.log('user disconnected');
    });*/
});
http.listen(3000, function(){
    console.log('listening on *:3000');
});