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
  const data = {
    message:req.query.idChat,
    rol:req.query.rol,
    idSession:req.query.idSession,
    idChat:req.query.idChat,
    date:req.query.date
  };
  console.log(req.query)
  io.broadcast.to(session_id).emit("chat_message",JSON.stringify(data));
});

io.on('connection', (socket) => {
  socket.on("join",(msg)=>{
    console.log(msg.session_id);
    socket.join(msg.session_id);
  });
  console.log(socket.handshake.query);
  console.log('a user connected');
  socket.on('chat_message', (msg) => {
    console.log('message:');
  });
});

io.on("connect_error", (err) => {
  console.log(`connect_error due to ${err.message}`);
});
server.listen(port, () => {
  console.log(`listening on *:${port}`);
});