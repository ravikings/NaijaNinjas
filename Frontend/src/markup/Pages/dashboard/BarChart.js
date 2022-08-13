import React from "react";
import { Chart as ChartJS, registerables } from "chart.js";
import { Bar, Line } from "react-chartjs-2";
ChartJS.register(...registerables);

const BarChart = () => {
  const data = {
    labels: ["M", "T", "W", "T", "F", "S", "S"],
    datasets: [
      {
        label: "Sales",
        tension: 0.4,
        borderWidth: 0,
        borderRadius: 4,
        borderSkipped: false,
        backgroundColor: "rgba(255, 255, 255, 0.8)",
        data: [50, 20, 10, 22, 50, 10, 40],
        maxBarThickness: 6,
      },
    ],
  };
  return (
    <Bar
      data={data}
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
              suggestedMin: 0,
              suggestedMax: 500,
              beginAtZero: true,
              padding: 10,
              font: {
                size: 14,
                weight: 300,
                family: "Roboto",
                style: "normal",
                lineHeight: 2,
              },
              color: "#fff",
              minRotation: 0,
              maxRotation: 50,
              mirror: false,
              textStrokeWidth: 0,
              textStrokeColor: "",
              display: true,
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
            beginAtZero: true,
            display: true,
            offset: false,
            reverse: false,
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
              display: true,
              drawOnChartArea: true,
              drawTicks: false,
              borderDash: [5, 5],
              color: "rgba(255, 255, 255, .2)",
              offset: true,
              lineWidth: 1,
              tickLength: 8,
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
            type: "category",
            offset: true,
            display: true,
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
    />
  );
};

export default BarChart;
