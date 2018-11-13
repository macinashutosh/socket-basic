var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  console.log('a user connected');
  socket["is_typing"] = false;
  socket.on('chat message', function(msg){
    console.log('chat message:'+msg);
    console.log(socket["username"])
  });
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
  socket.on('assign name',function(name){
    socket["username"] = name;
  });
  socket.on('user istyping',function(){
      if(socket["is_typing"] == true){

      }else{
        socket["is_typing"] = true;
        console.log(socket["username"]+" is typing");
      }

  });
  socket.on('user nottyping',function(){
    if(socket["is_typing"] == true){
      socket["is_typing"] = false;
      console.log(socket["username"]+" stopped typing");
    }else{

    }

  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
