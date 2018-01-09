const mongoose = require("./init");
const timestamps = require("mongoose-timestamp");

const notificationSchema = new mongoose.Schema({
  title: String,
  body: String,
  checked: Boolean
});
notificationSchema.plugin(timestamps);

const Notification = mongoose.model("Notification", notificationSchema);

module.exports = Notification;
