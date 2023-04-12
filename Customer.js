const mongoose = require("mongoose");
var Schema = mongoose.Schema,
  ObjectId = Schema.ObjectId;
const customerSchema = new Schema({
  fName: String,
  lName: String,
  gender: String,
  age: Number,
  familySize: Number,
  profession: String,
  workExp: Number,
  annualIncome: Number,
  spendingScore: Number,
});

module.exports = mongoose.model("Customer", customerSchema);
