import React from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { Bar } from 'react-chartjs-2'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
      labels: { color: '#fef6e7' },
    },
    title: {
      display: true,
      text: 'Number of day in week',
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

const labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

export const data = {
  labels,
  datasets: [
    {
      label: 'Ontime',
      data: [10, 20, 50, 40, 10, 100],
      backgroundColor: '#FFAC2F',
    },
    {
      label: 'Late/Early',
      data: [5, 11, 60, 30, 5, 80],
      backgroundColor: '#fef6e7',
    },
  ],
}

export const AttendanceColumnChart = () => {
  return (
    <div className="bg-secondary-600 border-2 border-primary p-5 rounded-lg">
      <Bar options={options} data={data} />
    </div>
  )
}
