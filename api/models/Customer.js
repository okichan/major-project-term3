const mongoose = require("./init");
const timestamps = require("mongoose-timestamp");

const customerSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  gender: String,
  email: String,
  phone: String,
  isChef: { type: Boolean, default: false },
  workAt: String,
  origin: String,
  purchasedProducts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product"
    }
  ],
  note: String
});
customerSchema.plugin(timestamps, {
  createdAt: "registerDate"
});

const Customer = mongoose.model("Customer", customerSchema);

module.exports = Customer;
