const mongoose = require("./init");

const notificationSchema = new mongoose.Schema({
  type: String,
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product"
  },
  sale: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Sale"
  },
  checked: { type: Boolean, default: false },
  notificationDate: { type: Date, default: Date.now }
});

const Notification = mongoose.model("Notification", notificationSchema);

module.exports = Notification;
