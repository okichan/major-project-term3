const mongoose = require("./init");
const timestamps = require("mongoose-timestamp");
const moment = require("moment");

const customerTrafficSchema = new mongoose.Schema({
  number: {
    type: Number,
    min: 0
  },
  origin: String,
  isChef: String,
  note: String,
  duration: {
    type: Number,
    min: 0
  },
  createdAt: Date
});

const CustomerTraffic = mongoose.model(
  "CustomerTraffic",
  customerTrafficSchema
);

module.exports = CustomerTraffic;
