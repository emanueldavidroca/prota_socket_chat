require('dotenv').config()
const port = process.env.PORT || 3000;
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server,{
  cors: {
    origin: "https://prota.ar"
  }
});
app.get("/nuevo",(req,res)=>{
  let session_id = req.query.session_id;
  console.log(req.query);
  const data = {
    message:req.query.message,
    rol:req.query.rol,
    idSession:req.query.idSession,
    idChat:req.query.idChat,
    date:req.query.date,
    username:req.query.username
  };
  io.to(session_id).emit("chat_message",JSON.stringify(data));
});

io.on('connection', (socket) => {
  socket.on("join",(msg)=>{
    console.log("chat abierto:"+msg.session_id);
    socket.join(msg.session_id);
  });
  console.log(socket.handshake.query);
  console.log('a user connected');
  socket.on('chat_message', (msg) => {
    console.log('message:'+msg);
  });
});

io.on("connect_error", (err) => {
  console.log(`connect_error due to ${err.message}`);
});
server.listen(port, () => {
  console.log(`listening on *:${port}`);
});