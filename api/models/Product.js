const mongoose = require("./init");

const productSchema = new mongoose.Schema({
  category: String,
  code: String,
  title: String,
  image: String,
  price: Number,
  stock: {
    type: Number,
    min: 0
  },
  totalSales: Number,
  totalOrders: Number
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
