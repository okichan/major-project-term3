const express = require("express");
const CustomerTraffic = require("../models/CustomerTraffic");
const authMiddleware = require("../middleware/auth");

const router = new express.Router();

// get list
router.get("/customerTraffics", (req, res) => {
  CustomerTraffic.find()
    .then(customerTraffic => {
      res.json(customerTraffic);
    })
    .catch(error => {
      res.json({ error });
    });
});

// Create
router.post("/customerTraffics", authMiddleware.requireJWT, (req, res) => {
  CustomerTraffic.create(req.body)
    .then(customerTraffic => {
      res.status(201).json(customerTraffic);
    })
    .catch(error => {
      res.status(400).json({ error });
    });
});

// Update
router.put("/customerTraffic/:id", authMiddleware.requireJWT, (req, res) => {
  const { id } = req.params;
  CustomerTraffic.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true
  })
    .then(customerTraffic => {
      if (customerTraffic) {
        res.json(customerTraffic);
      } else {
        res.status(404).json({
          error: new Error(`CustomerTraffic with id '${id}' not found`)
        });
      }
    })
    .catch(error => {
      res.status(400).json({ error });
    });
});

// Delete
router.delete("/customerTraffic/:id", (req, res) => {
  const { id } = req.params;
  CustomerTraffic.findByIdAndRemove(id)
    .then(customerTraffic => {
      if (customerTraffic) {
        res.json({
          message: `CustomerTraffic ${customerTraffic._id} is deleted`
        });
      } else {
        res.status(404).json({ message: `could not find id with ${id}` });
      }
    })
    .catch(error => {
      res.status(500).json({ error: error.message });
    });
});

module.exports = router;
