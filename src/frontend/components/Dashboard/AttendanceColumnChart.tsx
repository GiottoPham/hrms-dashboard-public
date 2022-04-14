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
import { useChartNumber } from '@frontend/state/chart-queries'
import { useChatParamsNumber } from '@frontend/state/chart-params'
import { WeekSelect } from '@components/Dashboard/WeekSelect'

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

export const AttendanceColumnChart = () => {
  const { chartParamsNumber } = useChatParamsNumber()
  const { chartNumber } = useChartNumber(chartParamsNumber)
  const data = {
    labels,
    datasets: [
      {
        label: 'Ontime',
        data: chartNumber?.onTime.every((v) => v === 0)
          ? [1, 3, 5, 7, 8, 9]
          : chartNumber?.onTime,
        backgroundColor: '#FFAC2F',
      },
      {
        label: 'Late/Early',
        data: chartNumber?.lateEarly.every((v) => v === 0)
          ? [9, 6, 8, 4, 3, 2]
          : chartNumber?.lateEarly,
        backgroundColor: '#fef6e7',
      },
      {
        label: 'Leave',
        data: chartNumber?.off.every((v) => v === 0)
          ? [3, 2, 7, 4, 1, 6]
          : chartNumber?.off,
        backgroundColor: '#FFBE5C',
      },
    ],
  }
  return (
    <div>
      <div className="w-48 mb-2">
        <WeekSelect />
      </div>
      <div className="bg-secondary-600 border-2 border-primary p-5 rounded-lg">
        <Bar options={options} data={data} />
      </div>
    </div>
  )
}
