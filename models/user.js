const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  email:{type:String,required:true,
    validate:{
      validator: validator.isEmail,
      message: "{VALUE} is not a valid email"
    }
  },
  password:{type:String,required:true}
});
userSchema.pre("save", function(next) {
  const user = this;
  if (user.isModified("password")) {
    bcrypt.genSalt(10, (error, salt) => {
      bcrypt.hash(user.password, salt, (err, hash) => {
        user.password = hash;
        next();
      });
    });
  } else {
    console.log("password not modified");
    next();
  }
});
const User = mongoose.model("User", userSchema);
module.exports = { User };
