const express = require("express");
const Sale = require("../models/Sale");
const Customer = require("../models/Customer");
const authMiddleware = require("../middleware/auth");

const router = new express.Router();

// get list
router.get("/sales", (req, res) => {
  Sale.find()
    .populate("products", "title")
    .populate("customer", "firstName")
    .populate("inCharge", "userName")
    .then(sales => {
      res.json(sales);
    })
    .catch(error => {
      res.json({ error });
    });
});

// Create
router.post("/sales", authMiddleware.requireJWT, (req, res) => {
  const currentUser = req.user;
  // get customer's id
  const customer_id = req.body.customer;
  const saleObject = new Sale(req.body);
  // set currentUser as this document's inCharge
  saleObject.inCharge = currentUser;
  saleObject
    .save()
    .then(sale => {
      res.status(201).json(sale);
      // push products to Customer's purchasedProducts array
      Customer.findByIdAndUpdate(
        customer_id,
        {
          $push: { purchasedProducts: { $each: sale.products } }
        },
        { new: true }
      ).exec();
    })
    .catch(error => {
      res.status(400).json({ error });
    });
});

// Update
router.put("/sales/:id", authMiddleware.requireJWT, (req, res) => {
  const { id } = req.params;
  Sale.findByIdAndUpdate(id, req.body, { new: true, runValidators: true })
    .then(sale => {
      if (sale) {
        res.json(sale);
      } else {
        res.status(404).json({
          error: new Error(`Sale with id '${id}' not found`)
        });
      }
    })
    .catch(error => {
      res.status(400).json({ error });
    });
});

// Delete
router.delete("/sales/:id", (req, res) => {
  const { id } = req.params;
  Sale.findByIdAndRemove(id)
    .then(sale => {
      if (sale) {
        res.json({ message: `Sale ${sale._id} is deleted` });
      } else {
        res.status(404).json({ message: `could not find id with ${id}` });
      }
    })
    .catch(error => {
      res.status(500).json({ error: error.message });
    });
});

module.exports = router;