const express = require("express");
const Sale = require("../models/Sale");
const Customer = require("../models/Customer");
const Product = require("../models/Product");
const authMiddleware = require("../middleware/auth");
const axios = require("axios");

const weatherApi = axios.create({
  baseURL: "http://api.apixu.com/v1"
});
// get weather data from api
getWeatherByDate = date => {
  return weatherApi
    .get(
      `/history.json?key=04042066cca345ad89331024170512&q=Melbourne&dt=${date}`
    )
    .then(weather => {
      return weather.data.forecast.forecastday[0];
    })
    .catch(error => {
      console.log(error.response);
    });
};

// calculate product stock and total sales
function stockAndTotalSalesCalculator(productId, sold) {
  Product.findByIdAndUpdate(
    productId,
    { $inc: { stock: -sold, totalSales: sold } },
    { new: true }
  )
    .then(data => {
      console.log(data);
    })
    .catch(error => {
      console.log(error);
    });
}

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
  const saleDate = req.body.date;
  const unitAmount = req.body.products;
  console.log(unitAmount);

  const saleObject = new Sale(req.body);
  // set currentUser as this document's inCharge
  saleObject.inCharge = currentUser;
  getWeatherByDate(saleDate)
    .then(weatherData => {
      saleObject.weather.description = weatherData.day.condition.text;
      saleObject.weather.maxTemp = weatherData.day.maxtemp_c;
      saleObject.weather.minTemp = weatherData.day.mintemp_c;
      saleObject
        .save()
        .then(sale => {
          res.status(201).json(sale);
          // push products to Customer's purchasedProducts array
          Customer.findByIdAndUpdate(
            customer_id,
            {
              $push: {
                purchasedHistory: sale._id
              }
            },
            { new: true }
          ).exec();

          // calculate product stock and totalSales
          sale.products.forEach(product => {
            stockAndTotalSalesCalculator(product.product, product.unitAmount);
          });
        })
        .catch(error => {
          res.status(400).json({ error });
        }); // save error catch
    })
    .catch(error => {
      res.status(400).json({ error });
    }); // weather api catch
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
