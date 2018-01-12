const express = require("express");
const Notification = require("../models/Notification");
const Product = require("../models/Product");
const Sale = require("../models/Sale");
const authMiddleware = require("../middleware/auth");

const router = new express.Router();

// Notice 1 week beforehand
// function isThreeMonthAgo(date) {
//   // for the one week notice
//   var sevenDays = 7 * 1000 * 60 * 60 * 24;
//   var day = new Date();
//   var threeMonthAgo = day.setMonth(day.getMonth() - 3);
//   var saleDay = new Date(date).getTime();
//
//   return threeMonthAgo > saleDay - sevenDays ? true : false;
// }

// get list
router.get("/notifications", (req, res) => {
  // check if notificationDate is less or equal than now
  Notification.find({ notificationDate: { $lte: new Date() } })
    .then(notifications => {
      res.json(notifications);
    })
    .catch(error => {
      res.json({ error });
    });
});

// Create
router.post("/notifications", authMiddleware.requireJWT, (req, res) => {
  Notification.create(req.body)
    .then(notification => {
      res.status(201).json(notification);
    })
    .catch(error => {
      res.status(400).json({ error });
    });
});

// Update
router.put("/notification/:id", authMiddleware.requireJWT, (req, res) => {
  const { id } = req.params;
  Notification.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true
  })
    .then(notification => {
      if (notification) {
        res.json(notification);
      } else {
        res.status(404).json({
          error: new Error(`Notification with id '${id}' not found`)
        });
      }
    })
    .catch(error => {
      res.status(400).json({ error });
    });
});

// delete checked notifications
router.delete("/notifications", (req, res) => {
  Notification.remove({ checked: true })
    .then(notification => {
      res.json({ message: "chekced notifications are deleted" });
    })
    .catch(error => {
      res.status(500).json({ error: error.message });
    });
});

module.exports = router;
