import { fetchPayroll } from '@frontend/state/payroll-api'
import { PAYROLL } from '@frontend/state/query-keys'
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
