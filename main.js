const express = require("express");
const app = express();
const http = require("http").Server(app)
const port = process.env.PORT || 8080;
const io = require("socket.io")(http);
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
io.on("connection",socket=>{
	console.log(socket)
})
app.listen(port,()=>{
	console.log(`escuchando port: ${port}`);
})