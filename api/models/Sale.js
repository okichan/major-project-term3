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
  weather: String,
  inCharge: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  date: { type: Date, default: Date.now }
});

const Sale = mongoose.model("Sale", saleSchema);

module.exports = Sale;
