const express=require('express');
const app = express();
const bodyParser=require("body-parser");
const mongoose = require("./config/mongoose.js");
const { User } = require("./models/user.js");
const cors=require('cors');

app.use(bodyParser.json());
app.use(cors());
app.get("/",(req,res)=>{
  res.send("HELLO WORLD!");
})

app.post("/create-user",(req,res)=>{
  console.log(req.body.user);
  const {email,password}=req.body.user;
  User.findOne({email:email}).then(
    user=>{
      if(!user){
        const userNew= new User({email,password});
        userNew.save().then(()=>{res.send("Created User")},error=>{
          console.log(error);
          res.send(error);})
      }else{
        res.send("EMAIL TAKEN!!!");
      }
    }
  )
})

app.listen(process.env.PORT || 3000,()=>{console.log("LISTENING ON PORT 3000");});
