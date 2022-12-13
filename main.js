const express = require("express");
const app = express();
const http = require("http").Server(app)
const port = process.env.PORT || 8080;
const io = require("socket.io")(http);
var cors = require('cors')
app.use(cors())

app.use(cors())
io.on("connection",socket=>{})
app.get("/",(req,res)=>{
	res.json("get request");
})
app.listen(port,()=>{
	console.log(`escuchando port: ${port}`);
})