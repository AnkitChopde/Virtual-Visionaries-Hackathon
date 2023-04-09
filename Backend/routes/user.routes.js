const express = require("express");
const UserModel = require("../models/user.model");
const userRoutes = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
import {StreamChat} from "stream-chat"
const { verifyToken } = require("../middlewares/authenticate");

const api_key = process.env.apiKey;
const secret_key = process.env.secretKey

const serverClient=new StreamChat.getInstance(api_key,secret_key)


userRoutes.get("/",async(req,res)=>{
    try{
        const user  = await UserModel.find();
        res.status(200).send({
            msg:user,
            status:"success"
        })
    }
    catch(e){
      res.status(400).send({
        msg:e.message
      })
    }
});

userRoutes.post("/register", async (req, res) => {
  const { email } = req.body;
  try {
      if ( req.body.email && req.body.password && req.body.username) {
          const preCheck = await UserModel.findOne({ email });
          const userId = uuidv4();
          if (!preCheck) {
              const hashedPassword = await bcrypt.hash(req.body.password, 7);
              const newUser = new UserModel({ ...req.body, password: hashedPassword,coins:100 });
              await newUser.save();
              const token = serverClient.createToken(userId);
              res.status(200).send({ msg: "User has been registered",data:{ token, userId,email, username, hashedPassword }, status: "success" });
          } else {
              res.status(400).send({ msg: "User already registered" })
          }
      } else {
          res.status(400).send({ msg: "Invalid data format" })
      }
  } catch (e) {
      res.status(400).send({ msg: e.message });
  }
});

userRoutes.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
      if (email && password) {
          const preCheck = await UserModel.findOne({ email });
          if (preCheck) {
              const hashCheck = await bcrypt.compare(password, preCheck.password);
              
              if (hashCheck) {
                  res.status(200).send({ msg: "User logged in successfull", status: "success", token });
              } else {
                  res.status(400).send({ msg: "Invalid password" });
              }
          } else {
              res.status(400).send({ msg: "User not found" });
          }
      } else {
          res.status(400).send({ msg: "Invalid data format" });
      }
  } catch (e) {
      res.status(400).send({ msg: e.message });
  }
});

userRoutes.patch("/update/:id",async(req,res)=>{

    const user = await UserModel.findOne({id});
    let payload = {...user,coins:req.body.coins}
  try {
    await UserModel.findByIdAndUpdate(req.params.id,payload);
    res.status(200).send({ msg: "User details has been updated", status: "success" });
} catch (e) {
    res.status(400).send({ msg: e.message });
}
})

module.exports=userRoutes