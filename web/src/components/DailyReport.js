import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

//get total sale
function getTotal(dailySalesDatas) {
  let total = 0;
  dailySalesDatas.forEach(d => {
    total += d.totalPrice;
  });
  return total;
}

function getTotalCustomers(dailyCustomerTraffics) {
  return dailyCustomerTraffics
    .map(customerTraffic => {
      return customerTraffic.number;
    })
    .reduce((a, b) => {
      return a + b;
    }, 0);
}

function getCloseRate(customerNumber, dailySalesDatas) {
  let ProductSaleDatasCount = 0;
  dailySalesDatas.forEach(dailySalesData => {
    dailySalesData.products.forEach(productInfo => {
      if (
        productInfo.product &&
        productInfo.product.category !== "Sharpening"
      ) {
        ProductSaleDatasCount++;
      }
    });
  });
  const value = ProductSaleDatasCount / customerNumber;
  if (value) {
    return Math.ceil(value * 10000) / 100;
  } else {
    return 0;
  }
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
            <th>Sale price</th>
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
                    <td>{`$${productInfo.salePrice}`}</td>
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

      <div className="row">
        <div className="col-md">
          <h2 className="mb-3">Statistical data</h2>
          <table className="table">
            <thead>
              <tr>
                <th>Total sold products</th>
                <th>Total sharpening service</th>
                <th>Total sales</th>
                <th>Total customers</th>
                <th>Close rate</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{dailySales && getAmountTotal("Product", dailySales)}</td>
                <td>
                  {dailySales && getAmountTotal("Sharpening", dailySales)}
                </td>
                <td>{dailySales && `$${getTotal(dailySales)}`}</td>
                <td>
                  {dailyCustomerTraffics &&
                    getTotalCustomers(dailyCustomerTraffics)}
                </td>
                <td>
                  {dailyCustomerTraffics &&
                    dailySales &&
                    `${getCloseRate(
                      getTotalCustomers(dailyCustomerTraffics),
                      dailySales
                    )}%`}
                </td>
              </tr>
            </tbody>
          </table>
          <hr />
        </div>
        {dailySales &&
          getAmountTotal("Product", dailySales) !== 0 && (
            <div className="col-md">
              <h2 className="mb-3">Sold products</h2>
              {getSoldProductList(dailySales)}
              <hr />
            </div>
          )}
      </div>
    </div>
  );
}

export default DailyReport;
