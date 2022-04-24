import { PAYROLL_PARAMS } from '@frontend/state/query-keys'
import type { PayrollParams } from '@frontend/types/payroll-params'
import { useCallback } from 'react'
import { useQuery, useQueryClient } from 'react-query'
import type { Updater } from 'react-query/types/core/utils'

export const usePayrollParams = () => {
  const queryClient = useQueryClient()

  const { data: payrollParams = defaultPayrollParams } =
    useQuery<PayrollParams>({
      queryKey: PAYROLL_PARAMS,
      queryFn: () => defaultPayrollParams,
    })

  const setPayrollParams = useCallback(
    (
      updater: Updater<PayrollParams | undefined, PayrollParams | undefined>
    ) => {
      queryClient.setQueryData<PayrollParams | undefined>(
        PAYROLL_PARAMS,
        updater
      )
    },
    [queryClient]
  )

  return {
    payrollParams,
    setPayrollParams,
  }
}
const now = new Date()
now.setMonth(now.getMonth() - 1)
const defaultPayrollParams: PayrollParams = {
  month: now.toISOString(),
  employeeId: 1,
}
