import React, { Component } from "react";
import { Pie } from "react-chartjs-2";
import "chart.piecelabel.js";

const chartOption = {
  pieceLabel: {
    render: "percentage",
    fontColor: ["green", "white", "red"],
    precision: 2
  }
};
export class PieChartChef extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chartData: props.pieChartChefData
    };
  }
  render() {
    return (
      <div className="chart">
        <Pie
          data={this.state.chartData}
          options={{
            pieceLabel: {
              render: "percentage",
              fontColor: ["green", "white", "red"],
              precision: 2
            }
          }}
        />
      </div>
    );
  }
}

export class PieChartOrigin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chartData: props.pieChartOriginData
    };
  }
  render() {
    return (
      <div className="chart">
        <Pie
          data={this.state.chartData}
          options={{
            pieceLabel: {
              render: "percentage",
              fontColor: [
                "green",
                "white",
                "red",
                "rgb(214, 191, 31)",
                "rgb(235, 235, 235)",
                "rgb(142, 67, 132)",
                "rgb(29, 219, 255)",
                "rgb(154, 29, 15)"
              ],
              precision: 2
            }
          }}
        />
      </div>
    );
  }
}
