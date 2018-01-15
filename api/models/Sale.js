const mongoose = require("./init");

const saleSchema = new mongoose.Schema({
  type: { type: String, default: "store" },
  products: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
      },
      salePrice: {
        type: Number,
        min: 0
      },
      unitAmount: {
        type: Number,
        min: 0,
        default: 1
      }
    }
  ],
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customer"
  },
  weather: {
    description: { type: String, default: null },
    maxTemp: { type: Number, default: null },
    minTemp: { type: Number, default: null }
  },
  totalPrice: {
    type: Number,
    min: 0
  },
  inCharge: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  date: { type: Date, default: Date.now } // require YYYY-MM-DD form
});

const Sale = mongoose.model("Sale", saleSchema);

module.exports = Sale;
