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
  const data = {
    message:req.query.idChat,
    idUser:req.query.idUser,
    rol:req.query.rol,
    idSession:req.query.idSession,
  };
  io.broadcast.to(data.idSession).emit("chat_message",JSON.stringify(data));
});

io.on('connection', (socket) => {

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