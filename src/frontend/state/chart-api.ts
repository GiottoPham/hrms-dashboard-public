import type {
  AttendStatus,
  AverageWorkingHour,
  ChartParams,
} from '@frontend/types/chart'
import axios from 'axios'

export const fetchAverage = (
  chartParamsHour: ChartParams
): Promise<AverageWorkingHour> => {
  return axios
    .request({
      method: 'GET',
      url: '/api/v1/chart/attendHour',
      params: chartParamsHour,
    })
    .then((res) => res.data)
}
export const fetchAttendStatus = (
  chartParamsNumber: ChartParams
): Promise<AttendStatus> => {
  return axios
    .request({
      method: 'GET',
      url: '/api/v1/chart/attendNumber',
      params: chartParamsNumber,
    })
    .then((res) => res.data)
}
export const fetchPaymentMonth = (year: string) => {
  return axios
    .request({
      method: 'GET',
      url: '/api/v1/chart/totalPaymentValues',
      params: {
        year,
      },
    })
    .then((res) => res.data)
}
