
const express = require("express");
const bcrypt = require('bcrypt');
const { UserModel } = require("../mdules/usermodel");
var jwt = require('jsonwebtoken');

const userroute = express();

userroute.post("/register", async(req, res)=>{
 const{username, email, pass} = req.body;
  try{
    bcrypt.hash(pass, 4, async(err, hash)=> {
        if(err){
            res.json({err});
        } else {
            const user = new UserModel({username, email, pass:hash});
            await user.save();
            res.json({msg:"new user is addding"})
        }
    });
  }catch(err){
    res.json({err});
  }
});

userroute.post("/login", async(req,res)=>{
   const{email, pass} = req.body;
   try{
    const user = await UserModel.findOne({email});
    bcrypt.compare(pass, user.pass, (err, result)=> {
        if(err){
            res.json({msg:"error"})
        } else {
            res.json({msg:"user is login..", Token:jwt.sign({ userID: user._id, username:user.username }, 'shhhhh')})
        }
    });
   }catch(err){
    res.json({err})
   }
});

module.exports = {
    userroute
}
