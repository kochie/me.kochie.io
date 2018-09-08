import * as React from "react";
import { Chart } from "chart.js";

import "./Header.scss";

export default class Header extends React.Component {
  canvas: React.RefObject<HTMLCanvasElement>;
  chart: Chart;

  constructor(props) {
    super(props);
    this.canvas = React.createRef();
  }

  componentDidMount() {
    const ctx = this.canvas.current.getContext("2d");
    const options = {
      type: "line",
      data: {
        labels: ["", "", "", "", "", ""],
        datasets: [
          {
            label: "# of Votes",
            data: [12, 1, 3, 5, 10, 4],
            borderWidth: 1,
            pointRadius: 0
          }
        ]
      },
      options: {
        animation: { duration: 2000, easing: "linear" },
        gridLines: {
          drawTicks: false,
          lineWidth: false,
          drawBorder: true
        },
        ticks: {
          display: false,
          fontColor: "#666"
        },
        legend: {
          display: false
        },
        maintainAspectRatio: false,
        layout: {
          padding: {
            bottom: 0
          }
        },
        scales: {
          xAxes: [
            {
              display: false
            }
          ],
          yAxes: [
            {
              display: false
            }
          ]
        }
      }
    };
    this.chart = new Chart(ctx, options);

    setInterval(() => this.updateChart(), 5000);
  }

  updateChart() {
    console.log("updated");
    const list = this.chart.data.datasets[0].data;
    list.splice(0, 1);
    list.push(Math.random() * 10);
    this.chart.update();
  }

  render() {
    return (
      <div className="header">
        <canvas className="backchart" ref={this.canvas} />
        <div className="gradient" />
        <span className="title-firstname">ROBERT</span>
        <br />
        <span className="title-lastname">KOCH</span>
      </div>
    );
  }
}
