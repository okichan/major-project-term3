const mongoose = require("./init");
const timestamps = require("mongoose-timestamp");

const customerTrafficSchema = new mongoose.Schema({
  number: Number,
  isChef: String
});

customerTrafficSchema.plugin(timestamps);

const CustomerTraffic = mongoose.model(
  "CustomerTraffic",
  customerTrafficSchema
);

module.exports = CustomerTraffic;
