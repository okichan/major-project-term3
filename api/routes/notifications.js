const express = require("express");
const Notification = require("../models/Notification");
const Product = require("../models/Product");
const Sale = require("../models/Sale");
const authMiddleware = require("../middleware/auth");

const router = new express.Router();

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
