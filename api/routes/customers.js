const express = require("express");
const Customer = require("../models/Customer");
const authMiddleware = require("../middleware/auth");

const router = new express.Router();

// get list
router.get("/customers", (req, res) => {
  Customer.find()
    .populate("purchasedProducts", "title")
    .then(customers => {
      res.json(customers);
    })
    .catch(error => {
      res.json({ error });
    });
});

// Create
router.post("/customers", authMiddleware.requireJWT, (req, res) => {
  Customer.create(req.body)
    .then(customer => {
      res.status(201).json(customer);
    })
    .catch(error => {
      res.status(400).json({ error });
    });
});

// Update
router.put("/customers/:id", authMiddleware.requireJWT, (req, res) => {
  const { id } = req.params;
  Customer.findByIdAndUpdate(id, req.body, { new: true, runValidators: true })
    .then(customer => {
      if (customer) {
        res.json(customer);
      } else {
        res.status(404).json({
          error: new Error(`Customer with id '${id}' not found`)
        });
      }
    })
    .catch(error => {
      res.status(400).json({ error });
    });
});

// Delete
router.delete("/customers/:id", (req, res) => {
  const { id } = req.params;
  Customer.findByIdAndRemove(id)
    .then(customer => {
      if (customer) {
        res.json({ message: `${customer.firstName} is deleted` });
      } else {
        res.status(404).json({ message: `could not find id with ${id}` });
      }
    })
    .catch(error => {
      res.status(500).json({ error: error.message });
    });
});

module.exports = router;
