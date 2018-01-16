import React, { Fragment } from "react";
import DatePicker from "react-datepicker";
import moment from "moment";
import "react-datepicker/dist/react-datepicker.css";
import Chart from "chart.js";

// recharts
import {
  BarChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine,
  Bar,
  ComposedChart
} from "recharts";

// get weekly data(sales)
function getWeeklySaleData(weekRange, salesData) {
  // detect today's weekNumber
  const WeekBegin = moment().week();

  // detect until which weekNumber
  let WeekEnd = moment()
    .subtract(weekRange, "weeks")
    .week();

  // make weekNumbers array
  let weekNumberArr = [];
  for (var n = 0; n < weekRange; n++) {
    weekNumberArr.push(
      moment()
        .subtract(n, "weeks")
        .week()
    );
  }

  // create Data array(container) for sorted sales data
  let weeklySalesObject = {};
  for (var n = 0; n < weekRange; n++) {
    const key = `week${weekNumberArr[n]}`;
    weeklySalesObject[key] = [];
  }

  // put the sales data in the container created above
  for (var i = 0; i < salesData.length; i++) {
    if (moment(salesData[i].date).week() == WeekEnd) break;
    let key = `week${moment(salesData[i].date).week()}`;
    weeklySalesObject[key].push(salesData[i]);
  }
  return weeklySalesObject;
}

// get weekly data(customer)
function getWeeklyCustomerData(weekRange, customerData) {
  // detect today's weekNumber
  const WeekBegin = moment().week();

  // detect until which weekNumber
  let WeekEnd = moment()
    .subtract(weekRange, "weeks")
    .week();

  // make weekNumbers array
  let weekNumberArr = [];
  for (var n = 0; n < weekRange; n++) {
    weekNumberArr.push(
      moment()
        .subtract(n, "weeks")
        .week()
    );
  }

  // create Data array(container)
  let weeklyCustomerObject = {};
  for (var n = 0; n < weekRange; n++) {
    const key = `week${weekNumberArr[n]}`;
    weeklyCustomerObject[key] = [];
  }

  // put the customer data in the container created above
  for (var i = 0; i < customerData.length; i++) {
    if (moment(customerData[i].createdAt).week() == WeekEnd) break;
    let key = `week${moment(customerData[i].createdAt).week()}`;
    weeklyCustomerObject[key].push(customerData[i]);
  }
  return weeklyCustomerObject;
}

const sharpningCategory = [
  "Sharpening Small",
  "Sharpening Medium",
  "Sharpening Damaged",
  "Sharpening Damaged Tip"
];

// create array data for chef nonchef pie chart
function getDataCustomerPieChart(customersData) {
  let CustomerPieChart = []; //[chef,nonChef,unknown]

  let total = customersData
    .map(customerData => {
      return customerData.number;
    })
    .reduce((a, b) => {
      return a + b;
    }, 0);

  let chef = customersData
    .map(customerData => {
      if (customerData.isChef === "true") {
        return customerData.number;
      } else {
        return 0;
      }
    })
    .reduce((a, b) => {
      return a + b;
    }, 0);

  let nonChef = customersData
    .map(customerData => {
      if (customerData.isChef === "false") {
        return customerData.number;
      } else {
        return 0;
      }
    })
    .reduce((a, b) => {
      return a + b;
    }, 0);

  let unknown = total - chef - nonChef;

  CustomerPieChart.push(chef, nonChef, unknown);
  return CustomerPieChart;
}

// get customer data for customer(chef and non chef)
function getDataCustomerGraph(weeklyCustomerData) {
  // for the customer trend graph(chef and non chef)
  let weeklyCustomerGraphArray = [];

  // loope through the weeklyCustomer Data
  Object.keys(weeklyCustomerData).forEach(customer => {
    // sale trend content.  for each time it empty
    let weeklyCustomerGraph = {};
    // week
    weeklyCustomerGraph["week"] = customer;

    // totalCustomer(number)
    weeklyCustomerGraph["totalCustomer"] = weeklyCustomerData[customer]
      .map(weeklyCustomers => {
        return weeklyCustomers.number;
      })
      .reduce((a, b) => {
        return a + b;
      }, 0);

    // number of chef
    weeklyCustomerGraph["chef"] = weeklyCustomerData[customer]
      .map(weeklyCustomers => {
        if (weeklyCustomers.isChef === "true") {
          return weeklyCustomers.number;
        } else {
          return 0;
        }
      })
      .reduce((a, b) => {
        return a + b;
      }, 0);

    // number of nonChef
    weeklyCustomerGraph["nonChef"] = weeklyCustomerData[customer]
      .map(weeklyCustomers => {
        if (weeklyCustomers.isChef === "false") {
          return weeklyCustomers.number;
        } else {
          return 0;
        }
      })
      .reduce((a, b) => {
        return a + b;
      }, 0);

    weeklyCustomerGraph["unknown"] =
      weeklyCustomerGraph["totalCustomer"] -
      weeklyCustomerGraph["chef"] -
      weeklyCustomerGraph["nonChef"];
    // push the object to array
    weeklyCustomerGraphArray.push(weeklyCustomerGraph);
  });
  return weeklyCustomerGraphArray;
}

//get sale trend for knife and stone
function saleTrendForKnife(weeklySales) {
  // for the sale trend chart(knife and stone)
  let weeklySalesTrendKnifeArray = [];

  // loope through the weeklySales data
  Object.keys(weeklySales).forEach(sale => {
    // sale trend content.  for each time it empty
    let weeklySalesTrendKnife = {};
    // week
    weeklySalesTrendKnife["week"] = sale;

    // totalSales(money)
    weeklySalesTrendKnife["totalSales"] = weeklySales[sale].map(weeklySales => {
      return weeklySales.products
        .map(weekSale => {
          // check knife, stone or sharpening
          if (!sharpningCategory.includes(weekSale.product.category)) {
            // knife and stone only
            return weekSale.salePrice;
          } else {
            return 0;
          }
        })
        .reduce((a, b) => {
          return a + b;
        }, 0);
    });
    weeklySalesTrendKnife["totalSales"] = weeklySalesTrendKnife[
      "totalSales"
    ].reduce((a, b) => {
      return a + b;
    }, 0);

    //total sales(unit)
    weeklySalesTrendKnife["totalUnit"] = weeklySales[sale].map(weeklySales => {
      return weeklySales.products
        .map(product => {
          // check knife, stone or sharpening
          if (!sharpningCategory.includes(product.product.category)) {
            // knife and stone only
            return product.unitAmount;
          } else {
            return 0;
          }
        })
        .reduce((a, b) => {
          return a + b;
        });
    });
    // sum up again
    weeklySalesTrendKnife["totalUnit"] = weeklySalesTrendKnife[
      "totalUnit"
    ].reduce((a, b) => {
      return a + b;
    }, 0);
    weeklySalesTrendKnifeArray.push(weeklySalesTrendKnife);
  });
  return weeklySalesTrendKnifeArray;
}

//get sale trend for sharpening
function saleTrendForSharpening(weeklySales) {
  // for the sale trend chart(sharpening)
  let weeklySalesTrendSharpArray = [];

  // loope through the weeklySales data
  Object.keys(weeklySales).forEach(sale => {
    // sale trend content.  for each time it empty
    let weeklySalesTrendSharp = {};
    // week
    weeklySalesTrendSharp["week"] = sale;

    // totalSales(money)
    weeklySalesTrendSharp["totalSales"] = weeklySales[sale].map(weeklySales => {
      return weeklySales.products
        .map(weekSale => {
          // check knife, stone or sharpening
          if (sharpningCategory.includes(weekSale.product.category)) {
            // sharpening only
            return weekSale.salePrice;
          } else {
            return 0;
          }
        })
        .reduce((a, b) => {
          return a + b;
        }, 0);
    });
    weeklySalesTrendSharp["totalSales"] = weeklySalesTrendSharp[
      "totalSales"
    ].reduce((a, b) => {
      return a + b;
    }, 0);

    //total sales(unit)
    weeklySalesTrendSharp["totalUnit"] = weeklySales[sale].map(weeklySales => {
      return weeklySales.products
        .map(product => {
          // check knife, stone or sharpening
          if (sharpningCategory.includes(product.product.category)) {
            // sharpening only
            return product.unitAmount;
          } else {
            return 0;
          }
        })
        .reduce((a, b) => {
          return a + b;
        });
    });
    // sum up again
    weeklySalesTrendSharp["totalUnit"] = weeklySalesTrendSharp[
      "totalUnit"
    ].reduce((a, b) => {
      return a + b;
    }, 0);
    weeklySalesTrendSharpArray.push(weeklySalesTrendSharp);
  });
  return weeklySalesTrendSharpArray;
}

function WeeklyReport({ monthRangeSales, customerTraffics }) {
  const customerPieChart = customerTraffics
    ? getDataCustomerPieChart(customerTraffics)
    : null;

  const customerGraph = customerTraffics
    ? getDataCustomerGraph(getWeeklyCustomerData(7, customerTraffics)).reverse()
    : null;

  const saleTrendKnife = monthRangeSales
    ? saleTrendForKnife(getWeeklySaleData(7, monthRangeSales)).reverse()
    : null;
  const saleTrendSharpening = monthRangeSales
    ? saleTrendForSharpening(getWeeklySaleData(7, monthRangeSales)).reverse()
    : null;

  const chefPieChartElement = document.getElementById("chefPieChart");
  const originPieChartElement = document.getElementById("originPieChart");
  if (chefPieChartElement !== null) {
    let ctx = chefPieChartElement.getContext("2d");
    ctx.canvas.width = 50;
    ctx.canvas.height = 50;
    const chefPieChart = new Chart(ctx, {
      type: "pie",
      data: {
        labels: ["Chef", "Non Chef", "Unknown"],
        datasets: [
          {
            backgroundColor: ["#2ecc71", "#e74c3c", "rgb(111, 107, 117)"],
            data: customerPieChart
          }
        ]
      }
    });
  }

  if (originPieChartElement !== null) {
    let ctx = originPieChartElement.getContext("2d");
    ctx.canvas.width = 50;
    ctx.canvas.height = 50;
    const originPieChart = new Chart(ctx, {
      type: "pie",
      data: {
        labels: [
          "Facebook",
          "Online search",
          "Newspaper",
          "QT Hotel Guest",
          "Referral",
          "Walk in",
          "Return",
          "unknown"
        ],
        datasets: [
          {
            backgroundColor: [
              "#2ecc71",
              "#e74c3c",
              "rgb(111, 107, 117)",
              "rgb(23, 214, 240)",
              "rgb(176, 210, 19)",
              "rgb(209, 47, 215)",
              "rgb(238, 69, 23)",
              "rgb(70, 0, 249)"
            ],
            data: [5, 3, 2, 9, 1, 8, 5, 1]
          }
        ]
      }
    });
  }

  return (
    <div>
      <h2>Customer Traffic (Chef or NonChef)</h2>
      {customerGraph && (
        <ComposedChart width={600} height={300} data={customerGraph}>
          <XAxis dataKey="week" />
          <YAxis />
          <Tooltip />
          <Legend />
          <CartesianGrid strokeDasharray="3 3" />
          <Bar
            dataKey="totalCustomer"
            name="Total customer"
            barSize={20}
            fill="#413ea0"
          />
          <Line type="monotone" dataKey="chef" name="Chef" stroke="#ff7300" />
          <Line
            type="monotone"
            dataKey="nonChef"
            name="NonChef"
            stroke="rgb(13, 194, 255)"
          />
          <Line
            type="monotone"
            dataKey="unknown"
            name="Unknown"
            stroke="rgb(191, 30, 86)"
          />
        </ComposedChart>
      )}
      <h2>Sale Trend Knife and Stone</h2>
      {saleTrendKnife && (
        <BarChart
          width={600}
          height={300}
          data={saleTrendKnife}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <XAxis dataKey="week" />
          <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
          <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Legend />
          <Bar yAxisId="left" dataKey="totalUnit" fill="#8884d8" />
          <Bar yAxisId="right" dataKey="totalSales" fill="#82ca9d" />
        </BarChart>
      )}

      <h2>Sale Trend Sharpening</h2>
      {saleTrendSharpening && (
        <BarChart
          width={600}
          height={300}
          data={saleTrendSharpening}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <XAxis dataKey="week" />
          <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
          <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Legend />
          <Bar yAxisId="left" dataKey="totalUnit" fill="#8884d8" />
          <Bar yAxisId="right" dataKey="totalSales" fill="#82ca9d" />
        </BarChart>
      )}
      <h2>Customer Chef Non Chef</h2>
      <div style={{ width: "50%" }}>
        <canvas id={"chefPieChart"} />
      </div>
      <h2>Customer Origin Chart</h2>
      <div style={{ width: "50%" }}>
        <canvas id={"originPieChart"} />
      </div>
    </div>
  );
}

export default WeeklyReport;
