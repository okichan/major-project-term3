const mongoose = require("./init");

const productSchema = new mongoose.Schema({
  category: String,
  code: String,
  title: String,
  image: String,
  price: Number,
  stock: {
    type: Number,
    min: 0,
    default: 0
  },
  totalSales: { type: Number, default: 0 },
  totalOrders: { type: Number, default: 0 }
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
