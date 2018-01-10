const mongoose = require("./init");

const notificationSchema = new mongoose.Schema({
  type: String,
  data: String,
  checked: { type: Boolean, default: false },
  notificationDate: { type: Date, default: Date.now }
});

const Notification = mongoose.model("Notification", notificationSchema);

module.exports = Notification;
