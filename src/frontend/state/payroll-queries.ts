import { fetchPayroll, fetchPayrollPdf } from '@frontend/state/payroll-api'
import { PAYROLL, PAYROLLPDF } from '@frontend/state/query-keys'
import type { PayrollParams } from '@frontend/types/payroll-params'
import type { AxiosError } from 'axios'
import { useQuery } from 'react-query'
import type { Payroll } from '@frontend/types/payroll'

export const usePayroll = (payrollParams: PayrollParams) => {
  const { data: payroll, ...rest } = useQuery<Payroll, AxiosError>({
    queryKey: [PAYROLL, payrollParams],
    queryFn: () => fetchPayroll(payrollParams),
    retry: false,
  })

  return { payroll, ...rest }
}
export const usePayrollPdf = (payrollParams: PayrollParams) => {
  const { data: payrollPdf, ...rest } = useQuery<string, AxiosError>({
    queryKey: [PAYROLLPDF, payrollParams],
    queryFn: () => fetchPayrollPdf(payrollParams),
    retry: false,
  })

  return { payrollPdf, ...rest }
}
