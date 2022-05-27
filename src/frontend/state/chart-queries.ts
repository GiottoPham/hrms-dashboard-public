import {
  fetchAttendStatus,
  fetchAverage,
  fetchPaymentMonth,
} from '@frontend/state/chart-api'
import {
  CHART_HOUR,
  CHART_NUMBER,
  PAYMENT_MONTH_CHART,
} from '@frontend/state/query-keys'
import type {
  AttendStatus,
  AverageWorkingHour,
  ChartParams,
} from '@frontend/types/chart'
import type { AxiosError } from 'axios'
import { useQuery } from 'react-query'

export const useChartHour = (chartParamsHour: ChartParams) => {
  const { data: chartHour, ...rest } = useQuery<AverageWorkingHour, AxiosError>(
    {
      queryKey: [CHART_HOUR, chartParamsHour],
      queryFn: () => fetchAverage(chartParamsHour),
      retry: false,
    }
  )

  return { chartHour, ...rest }
}
export const useChartNumber = (chartParamsNumber: ChartParams) => {
  const { data: chartNumber, ...rest } = useQuery<AttendStatus, AxiosError>({
    queryKey: [CHART_NUMBER, chartParamsNumber],
    queryFn: () => fetchAttendStatus(chartParamsNumber),
    retry: false,
  })

  return { chartNumber, ...rest }
}
export const usePaymentMonth = (year: string) => {
  const { data: paymentMonth, ...rest } = useQuery<AttendStatus, AxiosError>({
    queryKey: [PAYMENT_MONTH_CHART, year],
    queryFn: () => fetchPaymentMonth(year),
    retry: false,
  })

  return { paymentMonth, ...rest }
}
