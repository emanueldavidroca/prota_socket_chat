const express = require("express");
const app = express();
const http = require("http").Server(app)
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

const port = process.env.PORT || 8080;
var cors = require('cors')
const corsOptions ={
   origin:'*', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}

app.use(cors(corsOptions)) // Use this after the variable declaration

app.get("/",(req,res)=>{
	res.json("get request");
})
// add this
app.get('/socket.io/socket.io.js', (req, res) => {
  res.sendFile(__dirname + '/node_modules/socket.io/client-dist/socket.io.js');
});
///

io.on('connection', (socket) => {
  console.log('a user connected');
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});
