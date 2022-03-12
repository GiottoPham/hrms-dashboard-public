import React from 'react'

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js'
import { Line } from 'react-chartjs-2'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
)
export const AttendanceChart = () => {
  const options = {
    elements: {
      line: {
        tension: 0.4,
      },
    },
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: 'Average working Time of employee in week',
        color: '#fef6e7',
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
          borderColor: '#fef6e7',
          borderWidth: 2,
        },
        ticks: {
          color: '#fef6e7',
        },
      },
      y: {
        grid: {
          display: false,
          borderColor: '#fef6e7',
          borderWidth: 2,
        },
        ticks: {
          color: '#fef6e7',
        },
      },
    },
  }
  const data = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    datasets: [
      {
        data: [7.5, 5.5, 6.5, 9, 8, 4],
        fill: true,
        backgroundColor: '#FFAC2F',
        borderColor: '#212936',
        color: '#fef6e7',
      },
    ],
  }
  return (
    <div className="bg-secondary-600 border-2 border-primary p-5 rounded-lg">
      <Line data={data} options={options} />
    </div>
  )
}
