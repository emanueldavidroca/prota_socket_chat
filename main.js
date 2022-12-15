const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http,{
  cors: {
    origin: "https://prota.ar:* "
  }
});

app.get("",(req,res)=>{
  io.emit("chat message",req.params.msg);
});
app.get("/nuevo",(req,res)=>{
  io.emit("chat message",req.params.msg);
});

//Whenever someone connects this gets executed
io.on('connection', function(socket) {
    console.log('A user connected');
    socket.on('chat message', (msg) => {
      console.log('message: ' + msg);
    });
   //Whenever someone disconnects this piece of code executed
   socket.on('disconnect', function () {
      console.log('A user disconnected');
   });
});

http.listen(3000, function() {
   console.log('listening on *:3000');
});