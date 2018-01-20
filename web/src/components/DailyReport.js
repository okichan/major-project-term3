import React, { Fragment } from "react";
import DatePicker from "react-datepicker";
import moment from "moment";
import "react-datepicker/dist/react-datepicker.css";

//get total sale
function getTotal(dailySalesDatas) {
  let total = 0;
  dailySalesDatas.forEach(d => {
    total += d.totalPrice;
  });
  return total;
}

function getAmountTotal(type, dailySalesDatas) {
  if (dailySalesDatas.length === 0) {
    return 0;
  } else {
    return dailySalesDatas
      .map(dailySalesData => {
        return dailySalesData.products
          .map(productInfo => {
            if (type === "Sharpening") {
              // type Sharpening
              if (productInfo.product) {
                if (productInfo.product.category === "Sharpening") {
                  return productInfo.unitAmount;
                } else {
                  return 0;
                }
              } else {
                return 0;
              }
            } else {
              // type Product
              if (productInfo.product) {
                if (productInfo.product.category !== "Sharpening") {
                  return productInfo.unitAmount;
                } else {
                  return 0;
                }
              } else {
                return 0;
              }
            }
          })
          .reduce((a, b) => a + b, 0);
      })
      .reduce((a, b) => a + b, 0);
  }
}

function getSoldProductList(dailySalesDatas) {
  if (dailySalesDatas.length === 0) {
    return;
  } else {
    const productsArray = dailySalesDatas.map(dailySalesData => {
      return dailySalesData.products;
    });

    return (
      <table className="table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Quantity</th>
            <th>Sale Price</th>
          </tr>
        </thead>
        <tbody>
          {productsArray.map(productsInfo => {
            return productsInfo.map(productInfo => {
              return (
                productInfo.product && (
                  <tr>
                    <td>{productInfo.product.title}</td>
                    <td>{productInfo.unitAmount}</td>
                    <td>{productInfo.salePrice}</td>
                  </tr>
                )
              );
            });
          })}
        </tbody>
      </table>
    );
  }
}

function DailyReport({
  startDate,
  onClick,
  dailySales,
  dailyCustomerTraffics
}) {
  return (
    <div className="container text-center">
      <h1>{startDate.format("Do MMM YYYY")}</h1>
      <DatePicker
        className="form-control mb-3"
        dateFormat="YYYY/MM/DD"
        showMonthDropdown
        selected={startDate}
        onChange={onClick}
      />

      <h2 className="mb-3">Statistical data</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Total sold products</th>
            <th>Total sharpening service</th>
            <th>Total sales</th>
            <th>Total customers</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{dailySales && getAmountTotal("Product", dailySales)}</td>
            <td>{dailySales && getAmountTotal("Sharpening", dailySales)}</td>
            <td>{dailySales && getTotal(dailySales)}</td>
            <td>
              {dailyCustomerTraffics &&
                dailyCustomerTraffics
                  .map(customerTraffic => {
                    return customerTraffic.number;
                  })
                  .reduce((a, b) => {
                    return a + b;
                  }, 0)}
            </td>
          </tr>
        </tbody>
      </table>
      {dailySales && getAmountTotal("Product", dailySales) !== 0 ? (
        <div>
          <h2>Sold products</h2>
          {getSoldProductList(dailySales)}
        </div>
      ) : (
        <hr />
      )}
    </div>
  );
}

export default DailyReport;
