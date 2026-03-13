const express = require('express');
const app = express();

//const app = require("express")();



app.get("/",(req,res)=>{
  res.send("hello world");
  
})



app.listen(3000, ()=>{
  console.log("Node js project has started at 3000 port");
})