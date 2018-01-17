import React, { Fragment } from "react";
import DatePicker from "react-datepicker";
import moment from "moment";
import "react-datepicker/dist/react-datepicker.css";
import Chart from "chart.js";
import { PieChartChef, PieChartOrigin } from "./PieChart";
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
    const weekDate = moment()
      .subtract(n, "week")
      .startOf("week")
      .format("YYYY MMM DD");
    const key = `${weekDate}`;
    weeklySalesObject[key] = [];
  }

  // put the sales data in the container created above
  for (var i = 0; i < salesData.length; i++) {
    if (moment(salesData[i].date).week() == WeekEnd) break;
    let key = `${moment(salesData[i].date)
      .startOf("week")
      .format("YYYY MMM DD")}`;
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
    const weekDate = moment()
      .subtract(n, "week")
      .startOf("week")
      .format("YYYY MMM DD");
    const key = `${weekDate}`;
    weeklyCustomerObject[key] = [];
  }

  // put the customer data in the container created above
  for (var i = 0; i < customerData.length; i++) {
    if (moment(customerData[i].createdAt).week() == WeekEnd) break;
    let key = `${moment(customerData[i].date)
      .startOf("week")
      .format("YYYY MMM DD")}`;
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

// get customer data for customer Graph(chef and non chef)
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

function detectOrigin(type, data) {
  return data
    .map(weeklyCustomers => {
      if (weeklyCustomers.origin === type) {
        return weeklyCustomers.number;
      } else {
        return 0;
      }
    })
    .reduce((a, b) => {
      return a + b;
    }, 0);
}

// get weekly customer origin bar chart
function getWeeklyCustomerOriginData(weeklyCustomerData) {
  // for the customer trend graph(chef and non chef)
  let weeklyCustomerOriginArray = [];

  // loope through the weeklyCustomer Data
  Object.keys(weeklyCustomerData).forEach(customer => {
    // sale trend content.  for each time it empty
    let weeklyCustomerOrigin = {};
    // week
    weeklyCustomerOrigin["week"] = customer;

    // totalCustomer(number)
    weeklyCustomerOrigin["totalCustomer"] = weeklyCustomerData[customer]
      .map(weeklyCustomers => {
        return weeklyCustomers.number;
      })
      .reduce((a, b) => {
        return a + b;
      }, 0);

    // number of Facebook
    weeklyCustomerOrigin["Facebook"] = detectOrigin(
      "Facebook",
      weeklyCustomerData[customer]
    );

    // number of OnlineSearch
    weeklyCustomerOrigin["OnlineSearch"] = detectOrigin(
      "OnlineSearch",
      weeklyCustomerData[customer]
    );

    // number of Referral
    weeklyCustomerOrigin["Referral"] = detectOrigin(
      "Referral",
      weeklyCustomerData[customer]
    );

    // number of Newspaper
    weeklyCustomerOrigin["Newspaper"] = detectOrigin(
      "Newspaper",
      weeklyCustomerData[customer]
    );

    // number of WalkIn
    weeklyCustomerOrigin["WalkIn"] = detectOrigin(
      "WalkIn",
      weeklyCustomerData[customer]
    );

    // number of HotelGuest
    weeklyCustomerOrigin["HotelGuest"] = detectOrigin(
      "HotelGuest",
      weeklyCustomerData[customer]
    );

    // number of Return
    weeklyCustomerOrigin["Return"] = detectOrigin(
      "Return",
      weeklyCustomerData[customer]
    );

    // number of Unknown
    weeklyCustomerOrigin["Unknown"] = detectOrigin(
      "Unknown",
      weeklyCustomerData[customer]
    );

    // push the object to array
    weeklyCustomerOriginArray.push(weeklyCustomerOrigin);
  });
  return weeklyCustomerOriginArray;
}

function WeeklyReport({
  monthRangeSales,
  customerTraffics,
  pieChartChefData,
  pieChartOriginData
}) {
  const customerGraph = customerTraffics
    ? getDataCustomerGraph(
        getWeeklyCustomerData(12, customerTraffics)
      ).reverse()
    : null;

  const saleTrendKnife = monthRangeSales
    ? saleTrendForKnife(getWeeklySaleData(12, monthRangeSales)).reverse()
    : null;

  const saleTrendSharpening = monthRangeSales
    ? saleTrendForSharpening(getWeeklySaleData(12, monthRangeSales)).reverse()
    : null;

  const customerOriginChart = customerTraffics
    ? getWeeklyCustomerOriginData(
        getWeeklySaleData(12, customerTraffics)
      ).reverse()
    : null;

  return (
    <div>
      <h2>Customer Traffic (Chef or NonChef)</h2>
      {customerGraph && (
        <ComposedChart width={800} height={300} data={customerGraph}>
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

      <h2>Customer with origin</h2>
      {customerOriginChart && (
        <ComposedChart width={800} height={300} data={customerOriginChart}>
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
          <Line type="monotone" dataKey="Facebook" stroke="#ff7300" />
          <Line
            type="monotone"
            dataKey="OnlineSearch"
            stroke="rgb(43, 251, 146)"
          />
          <Line type="monotone" dataKey="Referral" stroke="rgb(202, 210, 25)" />
          <Line
            type="monotone"
            dataKey="Newspaper"
            stroke="rgb(185, 45, 241)"
          />
          <Line type="monotone" dataKey="WalkIn" stroke="rgb(131, 87, 173)" />
          <Line
            type="monotone"
            dataKey="HotelGuest"
            stroke="rgb(138, 227, 19)"
          />
          <Line type="monotone" dataKey="Return" stroke="rgb(187, 113, 129)" />
          <Line type="monotone" dataKey="Unknown" stroke="rgb(125, 122, 120)" />
        </ComposedChart>
      )}

      <h2>Sale Trend Knife and Stone</h2>
      {saleTrendKnife && (
        <BarChart
          width={800}
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
          width={800}
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
      {pieChartChefData && <PieChartChef pieChartChefData={pieChartChefData} />}
      <h2>Customer Origin</h2>
      {pieChartOriginData && (
        <PieChartOrigin pieChartOriginData={pieChartOriginData} />
      )}
    </div>
  );
}

export default WeeklyReport;
