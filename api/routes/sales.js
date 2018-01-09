const express = require("express");
const Sale = require("../models/Sale");
const Customer = require("../models/Customer");
const Product = require("../models/Product");
const Notification = require("../models/Notification");
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
//
// ***** due to the update validation issue, cant use this function ****
// function stockAndTotalSalesCalculator(productId, sold) {
//   Product.findByIdAndUpdate(
//     productId,
//     { $inc: { stock: -sold, totalSales: sold } },
//     { new: true }
//   )
//     .then(data => {
//       console.log(data);
//     })
//     .catch(error => {
//       console.log(error);
//     });
// }
// ***************************************************************

function stockAndTotalSalesCalculator(productId, sold) {
  Product.findById(productId, function(err, productData) {
    if (err) return handleError(err);
    productData.stock -= sold;
    // judge if need to create a notification
    if (productData.stock <= 2) {
      Notification.create({
        title: "Order reminder",
        body: `${productData.title}'s stock is now ${productData.stock}.'`
      })
        .then(notificationData => {
          console.log("new notification is created!");
        })
        .catch(error => {
          console.error(error.message);
        });
    }
    productData.totalSales += sold;
    productData.save(function(err) {
      if (err) console.error(err.message);
    });
  });
}

// judge if the sale doesn't make any stock problems. boolean
function stockIsFine(productId, sold) {
  return Product.findById(productId)
    .then(product => {
      return product.stock - sold >= 0;
    })
    .catch(error => {
      console.log(error.message);
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
  let stockOk = true;
  const currentUser = req.user;
  // get customer's id
  const customer_id = req.body.customer;
  const saleDate = req.body.date;

  const saleObject = new Sale(req.body);

  let ctr = 0;

  // check if number of stock wouldn't be negative
  req.body.products.forEach((product, index, array) => {
    return stockIsFine(product.product, product.unitAmount).then(result => {
      ctr++;
      if (result === false) {
        stockOk = false;
      }
      // after forEach execute below code
      if (ctr === array.length) {
        if (stockOk) {
          //stock validation pass

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
                    stockAndTotalSalesCalculator(
                      product.product,
                      product.unitAmount
                    );
                  });
                })
                .catch(error => {
                  res.status(400).json({ error });
                }); // save error catch
            })
            .catch(error => {
              res.status(400).json({ error });
            }); // weather api catch
        } else {
          // stock validation faild
          res.status(400).json({ error: "stock validation is faild" });
          console.error("stock validation is faild");
        }
      }
    });
  });
});

// Update
router.put("/sale/:id", authMiddleware.requireJWT, (req, res) => {
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
router.delete("/sale/:id", (req, res) => {
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
