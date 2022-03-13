import { ADD_EMPLOYEE_STEP, EMPLOYEE_PARAMS } from '@frontend/state/query-keys'
import type { EmployeeParams } from '@frontend/types/employee'
import { useCallback } from 'react'
import { useQuery, useQueryClient } from 'react-query'
import type { Updater } from 'react-query/types/core/utils'
import type { PartialDeep } from 'type-fest'
export const useAddEmployeeForm = () => {
  const queryClient = useQueryClient()
  const { data: employeeParams = defaultEmployeeParams } = useQuery<
    PartialDeep<EmployeeParams>
  >({
    queryKey: EMPLOYEE_PARAMS,
    queryFn: () => defaultEmployeeParams,
  })
  const { data: addStep = 0 } = useQuery(ADD_EMPLOYEE_STEP, () => 0)
  const setEmployeeParams = useCallback(
    (
      updater: Updater<
        PartialDeep<EmployeeParams> | undefined,
        PartialDeep<EmployeeParams>
      >
    ) => {
      queryClient.setQueryData(EMPLOYEE_PARAMS, updater)
    },
    [queryClient]
  )
  const setAddStep = useCallback(
    (step: number) => {
      queryClient.setQueryData<number>(ADD_EMPLOYEE_STEP, step)
    },
    [queryClient]
  )
  const resetEmployeeForm = useCallback(() => {
    queryClient.setQueryData<PartialDeep<EmployeeParams>>(
      EMPLOYEE_PARAMS,
      defaultEmployeeParams
    )
  }, [queryClient])
  return {
    employeeParams,
    setEmployeeParams,
    addStep,
    setAddStep,
    resetEmployeeForm,
  }
}

export const defaultEmployeeParams: PartialDeep<EmployeeParams> = {
  jobDetail: {},
  personalDetail: {},
  accountDetail: {},
}
