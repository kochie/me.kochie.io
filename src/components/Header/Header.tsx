import * as React from "react";
import { Chart } from "chart.js";
import Head from "next/head";

export default class Header extends React.Component {
  canvas: React.RefObject<HTMLCanvasElement>;
  chart?: Chart;

  constructor(props: Readonly<{}>) {
    super(props);
    this.canvas = React.createRef();
  }

  componentDidMount() {
    if (this.canvas.current === null) {
      return;
    }
    const ctx = this.canvas.current.getContext("2d");
    if (ctx === null) {
      return;
    }
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
    if (!this.chart || !this.chart.data.datasets) {
      return;
    }
    const list = this.chart.data.datasets[0].data;
    if (typeof list === "undefined") {
      return;
    }
    list.splice(0, 1);
    list.push(Math.random() * 10);
    this.chart.update();
  }

  render() {
    return (
      <>
        <Head>
          <link rel="stylesheet" href="/static/styles/header.css" />
        </Head>
        <div className="header">
          <canvas className="backchart" ref={this.canvas} />
          <div className="gradient" />
          <span className="title-firstname">ROBERT</span>
          <br />
          <span className="title-lastname">KOCH</span>
        </div>
      </>
    );
  }
}
