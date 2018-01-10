const express = require("express");
const Notification = require("../models/Notification");
const Product = require("../models/Product");
const Sale = require("../models/Sale");
const authMiddleware = require("../middleware/auth");

const router = new express.Router();

// check if any sales date is 3 months ago to create notifications
Sale.find({ reminded: false })
  .then(sales => {
    sales.forEach(sale => {
      if (isThreeMonthAgo(sale.date)) {
        console.log("remind");
      }
    });
  })
  .catch(error => {
    console.error(error.message);
  });

// Notice 1 week beforehand
function isThreeMonthAgo(date) {
  // for the one week notice
  var sevenDays = 7 * 1000 * 60 * 60 * 24;
  var day = new Date();
  var threeMonthAgo = day.setMonth(day.getMonth() - 3);
  var saleDay = new Date(date).getTime();

  return threeMonthAgo > saleDay - sevenDays ? true : false;
}

// create sharpening reminder notification
function createSharpeningReminder(product, customer, sale) {
  Notification.create({
    title: "Sharpening Reminder",
    body: `${customer.firstName} purchased ${product.title} on ${
      sale.date
    }. Please send a sharpening reminder message.`
  });
}

// get list
router.get("/notifications", (req, res) => {
  Notification.find()
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

// Delete
router.delete("/notification/:id", (req, res) => {
  const { id } = req.params;
  Notification.findByIdAndRemove(id)
    .then(notification => {
      if (notification) {
        res.json({ message: `${notification.firstName} is deleted` });
      } else {
        res.status(404).json({ message: `could not find id with ${id}` });
      }
    })
    .catch(error => {
      res.status(500).json({ error: error.message });
    });
});

module.exports = router;
