const mongoose = require("./init");

const saleSchema = new mongoose.Schema({
  products: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product"
    }
  ],
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customer"
  },
  weather: Stirng,
  inCharge: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  date: { type: Date, default: Date.now }
});

const Sale = mongoose.model("Customer", saleSchema);

module.exports = Sale;
