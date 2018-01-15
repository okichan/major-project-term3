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
  Bar
} from "recharts";

// get weekly data
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

const sharpningCategory = [
  "Sharpening Small",
  "Sharpening Medium",
  "Sharpening Damaged",
  "Sharpening Damaged Tip"
];

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

function WeeklyReport({ monthRangeSales }) {
  const saleTrendKnife = monthRangeSales
    ? saleTrendForKnife(getWeeklySaleData(7, monthRangeSales)).reverse()
    : null;
  const saleTrendSharpening = monthRangeSales
    ? saleTrendForSharpening(getWeeklySaleData(7, monthRangeSales)).reverse()
    : null;

  var chartElement = document.getElementById("myChart");
  if (chartElement !== null) {
    var ctx = chartElement.getContext("2d");
    ctx.canvas.width = 50;
    ctx.canvas.height = 50;
    var myChart = new Chart(ctx, {
      type: "pie",
      data: {
        labels: ["Chef", "Non Chef"],
        datasets: [
          {
            backgroundColor: ["#2ecc71", "#e74c3c"],
            data: [19, 6]
          }
        ]
      }
    });
  }

  return (
    <div>
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
      <h2>Customer</h2>
      <div style={{ width: "50%" }}>
        <canvas id={"myChart"} />
      </div>
    </div>
  );
}

export default WeeklyReport;
