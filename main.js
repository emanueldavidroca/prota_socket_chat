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

io.on('connection', (socket) => {
  console.log('a user connected');
});
io.on("connect_error", (err) => {
  console.log(`connect_error due to ${err.message}`);
});
server.listen(3000, () => {
  console.log('listening on *:3000');
});