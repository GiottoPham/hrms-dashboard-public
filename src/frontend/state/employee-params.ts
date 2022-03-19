import { EMPLOYEE_TABLE_PARAMS } from '@frontend/state/query-keys'
import type { EmployeeParams } from '@frontend/types/employee-params'
import { useCallback } from 'react'
import { useQuery, useQueryClient } from 'react-query'
import type { Updater } from 'react-query/types/core/utils'

export const useEmployeeParams = () => {
  const queryClient = useQueryClient()

  const { data: employeeParams = defaultEmployeeParams } =
    useQuery<EmployeeParams>({
      queryKey: EMPLOYEE_TABLE_PARAMS,
      queryFn: () => defaultEmployeeParams,
    })

  const setEmployeeParams = useCallback(
    (updater: Updater<EmployeeParams | undefined, EmployeeParams>) => {
      queryClient.setQueryData<EmployeeParams>(EMPLOYEE_TABLE_PARAMS, updater)
    },
    [queryClient]
  )

  return {
    employeeParams,
    setEmployeeParams,
  }
}
export const defaultEmployeeParams: EmployeeParams = {
  sort: {
    sortBy: 'id',
    sortOrder: 'asc',
  },
}
