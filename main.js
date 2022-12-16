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
app.get("",(req,res)=>{
  io.emit("chat message",req.params.msg);
});
app.get("/nuevo",(req,res)=>{
  io.emit("chat message",req.params.msg);
});
io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('salutations', (msg) => {
    console.log('message: ' + msg);
  });
});
io.on("connect_error", (err) => {
  console.log(`connect_error due to ${err.message}`);
});
server.listen(port, () => {
  console.log(`listening on *:${port}`);
});