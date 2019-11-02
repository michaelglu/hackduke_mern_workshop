const mongoose = require("mongoose");

mongoose.Promise = global.Promise;
const options = { useNewUrlParser: true };
mongoose.connect(
  //"mongodb://localhost:27017/EdgeStorage",
  "mongodb://server:server12345@ds141238.mlab.com:41238/hackdukedemo",
  options,
  function(error) {
    if (error) {
      console.log(error);
    }
  }
);

module.exports = { mongoose };
