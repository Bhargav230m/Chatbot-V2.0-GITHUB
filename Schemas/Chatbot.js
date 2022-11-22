const { model, Schema } = require("mongoose");

let AI = new Schema({
  Guild: String,
  Channel: String,
  CrashReport: String,
});

module.exports = model("AI", AI);
