const mongoose = require("./init");

const saleSchema = new mongoose.Schema({
  products: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
      },
      unitAmount: Number
    }
  ],
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customer"
  },
  weather: {
    description: String,
    maxTemp: Number,
    minTemp: Number
  },
  totalPrice: Number,
  inCharge: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  reminded: { type: Boolean, default: false },
  date: { type: Date, default: Date.now }
});

const Sale = mongoose.model("Sale", saleSchema);

module.exports = Sale;
