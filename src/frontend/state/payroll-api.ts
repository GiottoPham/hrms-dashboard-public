import type { Payroll } from '@frontend/types/payroll'
import type { PayrollParams } from '@frontend/types/payroll-params'
import axios from 'axios'

export const fetchPayroll = (
  payrollParams: PayrollParams
): Promise<Payroll> => {
  return axios
    .request({
      method: 'GET',
      url: '/api/v1/payment',
      params: payrollParams,
    })
    .then((res) => res.data)
}
export const fetchPayrollPdf = (month: string): Promise<string> => {
  return axios
    .request({
      method: 'GET',
      url: '/api/v1/link',
      params: { month },
    })
    .then((res) => res.data.contentLink)
}
