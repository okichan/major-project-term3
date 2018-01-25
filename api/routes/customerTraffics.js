const express = require("express");
const CustomerTraffic = require("../models/CustomerTraffic");
const authMiddleware = require("../middleware/auth");
const moment = require("moment");

const router = new express.Router();

// get list
router.get("/customerTraffics", (req, res) => {
  const { date } = req.query;
  if (date) {
    const day = moment
      .utc(date)
      .startOf("day")
      .toDate();
    const nextDay = moment
      .utc(day)
      .add(1, "days")
      .toDate();
    CustomerTraffic.find({
      createdAt: {
        $gte: day,
        $lt: nextDay
      }
    })
      .then(customerTraffics => {
        res.json(customerTraffics);
      })
      .catch(error => {
        res.json({ error });
      });
  } else {
    CustomerTraffic.find()
      .then(customerTraffics => {
        res.json(customerTraffics);
      })
      .catch(error => {
        res.json({ error });
      });
  }
});

// Create
router.post("/customerTraffics", authMiddleware.requireJWT, (req, res) => {
  CustomerTraffic.create(req.body)
    .then(customerTraffic => {
      CustomerTraffic.findByIdAndUpdate(
        customerTraffic._id,
        {
          createdAt: moment
            .utc()
            .add(11, "hours")
            .toDate()
        },
        { new: true }
      )
        .then(data => {
          res.status(201).json(customerTraffic);
        })
        .catch(error => {
          res.json({ error });
        });
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
