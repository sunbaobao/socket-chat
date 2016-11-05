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
var gustNumber=0;
var nickNames={};
var rooms=[];
var currentRoom={};
io.on('connection', function(socket){
    socket.on('new message', function(msg){
        io.emit('chat message', msg)
    });
    socket.on("add user",function (user) {

       if(user){
           gustNumber++;
           nickNames[socket.id]=user;
           var logM="欢迎"+user+"加入聊天室(∩_∩)";
           io.emit("log",logM);
           //console.log(gustNumber);
       }
    });
    socket.on('disconnect', function(){
        if(typeof nickNames[socket.id]!=="undefined"){
            var user= nickNames[socket.id];
            delete nickNames[socket.id];
            gustNumber--;
            var logM=user+"退出了聊天室(づ｡◕‿‿◕｡)づ！";
            io.emit("log",logM);
            // console.log(gustNumber);
        }
    });
});
http.listen(4010, function(){
    console.log('listening on *:4010');
});