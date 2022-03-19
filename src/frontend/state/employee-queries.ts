import { fetchEmployee } from '@frontend/state/employee-api'
import { EMPLOYEES } from '@frontend/state/query-keys'
import type { Employee } from '@frontend/types/employee'
import type { EmployeeParams } from '@frontend/types/employee-params'
import type { AxiosError } from 'axios'
import { useQuery } from 'react-query'

export const useEmployees = (employeParams: EmployeeParams) => {
  const { data: employees, ...rest } = useQuery<Employee[], AxiosError>({
    queryKey: [EMPLOYEES, employeParams],
    queryFn: () => fetchEmployee(employeParams),
    retry: false,
  })

  return { employees, ...rest }
}
