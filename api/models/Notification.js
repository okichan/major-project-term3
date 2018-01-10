const mongoose = require("./init");

const notificationSchema = new mongoose.Schema({
  type: String,
  data: String,
  checked: Boolean,
  notificationDate: { type: Date, default: Date.now }
});

const Notification = mongoose.model("Notification", notificationSchema);

module.exports = Notification;
