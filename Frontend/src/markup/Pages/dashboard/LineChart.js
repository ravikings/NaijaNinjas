import React from "react";
import { Chart as ChartJS, registerables } from "chart.js";
import { Bar, Line } from "react-chartjs-2";
ChartJS.register(...registerables);

const LineChart = () => {
  const data2 = {
    labels: ["Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [
      {
        label: "Desktop apps",
        tension: 0,
        pointRadius: 5,
        pointBorderColor: "transparent",
        pointBackgroundColor: "rgba(255, 255, 255, .8)",
        borderColor: "rgba(255, 255, 255, .8)",
        borderWidth: 4,
        backgroundColor: "transparent",
        fill: true,
        data: [50, 40, 300, 220, 500, 250, 400, 230, 500],
        maxBarThickness: 6,
      },
    ],
  };
  return (
    <Line
      data={data2}
      options={{
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
          },
        },
        interaction: {
          intersect: false,
          mode: "index",
        },
        scales: {
          y: {
            axis: "y",
            grid: {
              drawBorder: false,
              display: true,
              drawOnChartArea: true,
              drawTicks: false,
              borderDash: [5, 5],
              color: "rgba(255, 255, 255, .2)",
              lineWidth: 1,
              tickLength: 8,
              offset: false,
              borderDashOffset: 0,
              borderWidth: 1,
              borderColor: "rgba(0,0,0,0.1)",
            },
            ticks: {
              display: true,
              color: "#f8f9fa",
              padding: 10,
              font: {
                size: 14,
                weight: 300,
                family: "Roboto",
                style: "normal",
                lineHeight: 2,
              },
              minRotation: 0,
              maxRotation: 50,
              mirror: false,
              textStrokeWidth: 0,
              textStrokeColor: "",
              autoSkip: true,
              autoSkipPadding: 3,
              labelOffset: 0,
              minor: {},
              major: {},
              align: "center",
              crossAlign: "near",
              showLabelBackdrop: false,
              backdropColor: "rgba(255, 255, 255, 0.75)",
              backdropPadding: 2,
            },
            type: "linear",
            display: true,
            offset: false,
            reverse: false,
            beginAtZero: false,
            bounds: "ticks",
            grace: 0,
            title: {
              display: false,
              text: "",
              padding: {
                top: 4,
                bottom: 4,
              },
              color: "#666",
            },
            id: "y",
            position: "left",
          },
          x: {
            axis: "x",
            grid: {
              drawBorder: false,
              display: false,
              drawOnChartArea: false,
              drawTicks: false,
              borderDash: [5, 5],
              lineWidth: 1,
              tickLength: 8,
              offset: false,
              borderDashOffset: 0,
              borderWidth: 1,
              color: "rgba(0,0,0,0.1)",
              borderColor: "rgba(0,0,0,0.1)",
            },
            ticks: {
              display: true,
              color: "#f8f9fa",
              padding: 10,
              font: {
                size: 14,
                weight: 300,
                family: "Roboto",
                style: "normal",
                lineHeight: 2,
              },
              minRotation: 0,
              maxRotation: 50,
              mirror: false,
              textStrokeWidth: 0,
              textStrokeColor: "",
              autoSkip: true,
              autoSkipPadding: 3,
              labelOffset: 0,
              minor: {},
              major: {},
              align: "center",
              crossAlign: "near",
              showLabelBackdrop: false,
              backdropColor: "rgba(255, 255, 255, 0.75)",
              backdropPadding: 2,
            },
            type: "category",
            display: true,
            offset: false,
            reverse: false,
            beginAtZero: false,
            bounds: "ticks",
            grace: 0,
            title: {
              display: false,
              text: "",
              padding: {
                top: 4,
                bottom: 4,
              },
              color: "#666",
            },
            id: "x",
            position: "bottom",
          },
        },
      }}
    ></Line>
  );
};

export default LineChart;
