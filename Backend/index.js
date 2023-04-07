const express = require("express");
const connection = require("./configs/db");

const app = express();

app.use(express.json());

app.get("/",(req,res)=>{
    res.send("Home Page")
});

app.listen(process.env.mongoURL,async()=>{
  try{
    await connection
    console.log("connected to database")
  }
  catch{
    console.log("error while connecting to database")
  }
  console.log("connected to server")
})