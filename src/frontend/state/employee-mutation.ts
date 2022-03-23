import {
  createEmployeeRequest,
  editEmployeeRequest,
} from '@frontend/state/employee-api'
import { EMPLOYEES } from '@frontend/state/query-keys'
import type {
  EmployeeParams,
  InsuranceInputParams,
} from '@frontend/types/employee'
import { useMutation, useQueryClient } from 'react-query'

export const useCreateEmployee = () => {
  const queryClient = useQueryClient()

  const { mutateAsync, ...rest } = useMutation({
    mutationFn: (employeeParams: EmployeeParams) =>
      createEmployeeRequest(employeeParams),
    onSuccess: () => {
      queryClient.refetchQueries([EMPLOYEES])
    },
    retry: false,
  })

  return { createEmployee: mutateAsync, ...rest }
}
export const useEditEmployee = () => {
  const queryClient = useQueryClient()

  const { mutateAsync, ...rest } = useMutation({
    mutationFn: ({
      id,
      employeeParams,
    }: {
      id: number
      employeeParams: Partial<
        Omit<EmployeeParams, 'accountDetail'> & {
          insuranceDetail: InsuranceInputParams
        }
      >
    }) => editEmployeeRequest(id, employeeParams),
    onSuccess: () => {
      queryClient.refetchQueries([EMPLOYEES])
    },
    retry: false,
  })

  return { editEmployee: mutateAsync, ...rest }
}
