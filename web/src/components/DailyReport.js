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

function getProductTotal(dailySalesDatas) {
  if(dailySalesDatas.length === 0) return 0
  return dailySalesDatas.map((dailySale)=>{
  return   dailySale.products.map((product)=>{
      return product.unitAmount
    }).reduce((a,b)=>{
      return a+b
    },0)
  })
}

function getSoldProductList(dailySalesDatas) {
  if (dailySalesDatas.length === 0) {
    return;
  } else {
    const productsArray = dailySalesDatas.map(dailySalesData => {
      return dailySalesData.products;
    });
    return productsArray.map(pro => {
      return (<table className='table'>
      <thead>
      <tr>
    <th>#</th>
    <th>Title</th>
    <th>Quantity</th>
    <th>Sale Price</th>
      </tr>
    </thead>
    <tbody>
    {pro.map((p,index)=>{
  return (<tr>
    <th scope="row">{index+1}</th>
    <td>{p.product.title}</td>
    <td>{p.unitAmount}</td>
    <td>{p.salePrice}</td>
  </tr>)
})}

</tbody>
          </table>)
    });


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
        onChange={onClick}/>

      <h2 className="mb-3">Statistical data</h2>
<table className="table">
  <thead>
    <tr>
      <th>Total sold products</th>
      <th>Total sales</th>
      <th>Total customers</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>{dailySales && getProductTotal(dailySales)}</td>
      <td>{dailySales && getTotal(dailySales)}</td>
      <td>{dailyCustomerTraffics && dailyCustomerTraffics.map((customerTraffic)=>{
        return customerTraffic.number
      }).reduce((a,b)=> {
        return a+b},0)}</td>
    </tr>
  </tbody>
</table>
{dailySales &&
  getProductTotal(dailySales) !== 0?
  (<div>
  <h2>Sold products</h2>
 {getSoldProductList(dailySales)}
 </div>) :(
   <hr/>
 )
 }
</div>
  );
}

export default DailyReport;
