const mongoose = require("./init");
const timestamps = require("mongoose-timestamp");

const customerTrafficSchema = new mongoose.Schema({
  number: {
    type: Number,
    min: 0
  },
  isChef: String
});

customerTrafficSchema.plugin(timestamps);

const CustomerTraffic = mongoose.model(
  "CustomerTraffic",
  customerTrafficSchema
);

module.exports = CustomerTraffic;
