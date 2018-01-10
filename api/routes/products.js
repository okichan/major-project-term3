const express = require("express");
const Product = require("../models/Product");
const authMiddleware = require("../middleware/auth");

const router = new express.Router();

// get list
router.get("/products", (req, res) => {
  const { category } = req.query;
  if (category) {
    Product.find({ category })
      .then(products => {
        res.json(products);
      })
      .catch(error => {
        res.json({ error });
      });
  } else {
    // when no string query is found
    Product.find()
      .then(products => {
        res.json(products);
      })
      .catch(error => {
        res.json({ error });
      });
  }
});

// Create
router.post("/products", authMiddleware.requireJWT, (req, res) => {
  Product.create(req.body)
    .then(product => {
      res.status(201).json(product);
    })
    .catch(error => {
      res.status(400).json({ error });
    });
});

// Update
router.put("/product/:id", authMiddleware.requireJWT, (req, res) => {
  const { id } = req.params;
  Product.findByIdAndUpdate(id, req.body, { new: true, runValidators: true })
    .then(product => {
      if (product) {
        res.json(product);
      } else {
        res.status(404).json({
          error: new Error(`Product with id '${id}' not found`)
        });
      }
    })
    .catch(error => {
      res.status(400).json({ error });
    });
});

// Delete
router.delete("/product/:id", (req, res) => {
  const { id } = req.params;
  Product.findByIdAndRemove(id)
    .then(product => {
      if (product) {
        res.json({ message: `${product.title} is deleted` });
      } else {
        res.status(404).json({ message: `could not find id with ${id}` });
      }
    })
    .catch(error => {
      res.status(500).json({ error: error.message });
    });
});

module.exports = router;
