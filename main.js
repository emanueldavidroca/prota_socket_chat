const express = require('express');
const app = express();
const http = require('http');
const { Server } = require("socket.io");
const httpServer = app.listen(3000, () => {console.log(`Server listening on port ${port}`)});
const io = new Server(httpServer,{
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
io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('chat message', (msg) => {
    console.log('message: ' + msg);
  });
});
io.on("connect_error", (err) => {
  console.log(`connect_error due to ${err.message}`);
});