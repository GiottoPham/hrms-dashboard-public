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
import { useEmployeeParams } from '@frontend/state/employee-params'
import { useEmployees } from '@frontend/state/employee-queries'
import { randomNumbersWithFixedSum } from '@components/Dashboard/utils'

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
      text: 'Number of employees on-time/late-early/off in week',
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

const labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

export const AttendanceColumnChart = () => {
  const { chartParamsNumber } = useChatParamsNumber()
  const { chartNumber } = useChartNumber(chartParamsNumber)
  const { employeeParams } = useEmployeeParams()
  const { employees } = useEmployees(employeeParams)
  const randomInteger1 = randomNumbersWithFixedSum(7, employees?.length || 0)
  const randomInteger2 = randomNumbersWithFixedSum(7, employees?.length || 0)
  const randomInteger3 = randomNumbersWithFixedSum(7, employees?.length || 0)
  const data = {
    labels,
    datasets: [
      {
        label: 'Ontime',
        data: chartNumber?.onTime.every((v) => v === 0)
          ? randomInteger1
          : chartNumber?.onTime,
        backgroundColor: '#FFAC2F',
      },
      {
        label: 'Late/Early',
        data: chartNumber?.lateEarly.every((v) => v === 0)
          ? randomInteger2
          : chartNumber?.lateEarly,
        backgroundColor: '#fef6e7',
      },
      {
        label: 'Off',
        data: chartNumber?.off.every((v) => v === 0)
          ? randomInteger3
          : chartNumber?.off,
        backgroundColor: '#FFBE5C',
      },
    ],
  }
  return (
    <div className="bg-secondary-600 border-2 border-primary p-5 rounded-lg">
      <Bar options={options} data={data} />
    </div>
  )
}
