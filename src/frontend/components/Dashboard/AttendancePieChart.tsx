import { useChatParamsNumber } from '@frontend/state/chart-params'
import { useChartNumber } from '@frontend/state/chart-queries'
import { Pie } from 'react-chartjs-2'
import ChartDataLabels from 'chartjs-plugin-datalabels'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  RadialLinearScale,
  ArcElement,
} from 'chart.js'

export const AttendancePieChart = () => {
  ChartJS.register(
    RadialLinearScale,
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    ChartDataLabels
  )
  const { chartParamsNumber } = useChatParamsNumber()
  const { chartNumber } = useChartNumber(chartParamsNumber)
  const labels = ['On Time', 'Late/Early', 'Off']
  const onTimeValue = chartNumber?.onTime.reduce((a, b) => a + b) || 0
  const lateEarlyValue = chartNumber?.lateEarly.reduce((a, b) => a + b) || 0
  const leaveValue = chartNumber?.off.reduce((a, b) => a + b) || 0
  const values = [onTimeValue, lateEarlyValue, leaveValue]
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: { color: '#fef6e7' },
      },
      title: {
        display: true,
        text: 'Ratio of employees on-time/late-early/off in week',
        color: '#fef6e7',
      },
      radius: '90%',
      datalabels: {
        color: 'black',
        display: 'auto',
        formatter: (value: number) => {
          const ratio = (value / values.reduce((a, b) => a + b)) * 100
          return ratio.toFixed(2) + '%'
        },
      },
    },
  }
  const data = {
    labels,
    datasets: [
      {
        data: values,
        backgroundColor: ['#FFAC2F', '#fef6e7', '#FFBE5C'],
      },
    ],
  }
  return (
    <div className="bg-secondary-600 border-2 border-primary p-5 rounded-lg">
      <Pie options={options} data={data} />
    </div>
  )
}
