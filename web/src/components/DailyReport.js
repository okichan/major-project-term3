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

function getSoldProductList(dailySalesDatas) {
  if (dailySalesDatas.length === 0) {
    return;
  } else {
    const productsArray = dailySalesDatas.map(dailySalesData => {
      return dailySalesData.products;
    });
    const productTitlesArray = productsArray.map(pro => {
      return pro.map(p => {
        return (
          <div>
            <p>{`${p.product.title} x ${p.unitAmount} Sale price was ${
              p.salePrice
            }`}</p>
          </div>
        );
      });
    });

    // const productTitlesArray = productsArray.map(product => {
    //   return <p>{product.product.title}</p>;
    // });
    return productTitlesArray;
  }
}

function DailyReport({
  startDate,
  onClick,
  dailySales,
  dailyCustomerTraffics
}) {
  return (
    <div>
      <h1>{startDate.format("Do MMM YYYY")}</h1>
      <DatePicker
        dateFormat="YYYY/MM/DD"
        showMonthDropdown
        selected={startDate}
        onChange={onClick}
      />
      <h1>Sold Products</h1>
      {dailySales && getSoldProductList(dailySales)}
      <h1>total sale</h1>
      {dailySales && <p>{getTotal(dailySales)}</p>}
    </div>
  );
}

export default DailyReport;
