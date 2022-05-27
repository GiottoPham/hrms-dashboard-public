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
import { usePaymentMonth } from '@frontend/state/chart-queries'
import { currencyFormatter } from '@frontend/framework/utils/currency'

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

export const PaymentMonthChart = () => {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: 'Payment of organization paid for employees each month',
        color: '#fef6e7',
      },
      datalabels: {
        display: false,
        color: '#FFAC2F',
        formatter: (value: number) => {
          return currencyFormatter(value)
        },
      },
      tooltip: {
        callbacks: {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          label: ({ dataset, parsed }: { dataset: any; parsed: any }) => {
            let label = dataset.label || ''

            if (label) {
              label += ': '
            }
            if (parsed.y !== null) {
              label += currencyFormatter(parsed.y)
            }
            return label
          },
        },
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

  const { paymentMonth } = usePaymentMonth(new Date().toISOString())
  const data = {
    labels: [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ],
    datasets: [
      {
        data: paymentMonth || [
          100000, 200000, 300000, 100000, 200000, 300000, 100000, 200000,
          300000, 100000, 200000, 300000,
        ],
        borderColor: '#FFAC2F',
        color: '#FFAC2F',
      },
    ],
  }
  return (
    <div className="bg-secondary-600 border-2 border-primary p-5 rounded-lg">
      <Line data={data} options={options} />
    </div>
  )
}
