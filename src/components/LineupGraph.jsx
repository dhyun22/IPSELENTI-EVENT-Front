import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart } from 'chart.js/auto';
import { CategoryScale, LinearScale, BarController, BarElement } from 'chart.js';

Chart.register(CategoryScale, LinearScale, BarController, BarElement);

const LineupGraph = ({ labels, values }) => {
  
  const data = {
    labels,
    datasets: [
      {
        label: 'Points Scored',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(255, 99, 132, 0.4)',
        hoverBorderColor: 'rgba(255, 99, 132, 1)',
        data: values
      }
    ]
  };

  const options = {
    indexAxis: 'y',
    scales: {
      x: {
        display: false
      },
      y: {
        display: false,
        min:0,
        max: 20000, // Set the maximum scale value based on the player1's value
        ticks: {
          stepSize: 5,
         
        }
      },
    },
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        enabled: false
      }
    },
    layout: {
      padding: {
        top: 0,
        bottom: 0,
        left: 0,
        right: 10
      }
    },
    barThickness: 6
  };

  return <Bar data={data} options={options} />;
};

export default LineupGraph;