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
import { useChartHour } from '@frontend/state/chart-queries'
import { useChatParamsHour } from '@frontend/state/chart-params'
import { WeekSelect } from '@components/Dashboard/WeekSelect'

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
      datalabels: {
        display: false,
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

  const { chartParamsHour } = useChatParamsHour()
  const { chartHour } = useChartHour(chartParamsHour)
  const data = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    datasets: [
      {
        data: chartHour?.every((v) => v === 0)
          ? [6.5, 6, 7, 6, 5, 7.5]
          : chartHour,
        fill: true,
        backgroundColor: '#FFAC2F',
        borderColor: '#212936',
        color: '#fef6e7',
      },
    ],
  }
  return (
    <div>
      <div className="w-48 mb-2">
        <WeekSelect isHour />
      </div>

      <div className="bg-secondary-600 border-2 border-primary p-5 rounded-lg">
        <Line data={data} options={options} />
      </div>
    </div>
  )
}
