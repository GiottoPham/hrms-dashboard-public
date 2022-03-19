import type { Employee } from '@frontend/types/employee'
import type { EmployeeParams } from '@frontend/types/employee-params'
import type { EmployeeParams as EmployeeInputParams } from '@frontend/types/employee'
import axios from 'axios'
import type { PartialDeep } from 'type-fest'

export const fetchEmployee = (
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  employeeParams: EmployeeParams
): Promise<Employee[]> => {
  return axios
    .request({
      method: 'GET',
      url: '/api/v1/employees',
    })
    .then((res) => res.data)
}
export const createEmployeeRequest = (
  employeeParams: PartialDeep<EmployeeInputParams>
): Promise<void> => {
  const employeeAvatar = employeeParams.personalDetail?.avatar
  const formData = new FormData()
  formData.append('avatar', employeeAvatar as File)
  delete employeeParams.personalDetail?.avatar
  formData.append('data', JSON.stringify(employeeParams))
  return axios
    .request({
      method: 'POST',
      url: `/api/employees`,
      data: formData,
    })
    .then((res) => res.data)
}
export const editEmployeeRequest = (
  id: number,
  employeeParams: Partial<Employee>
): Promise<void> => {
  return axios
    .request({
      method: 'PUT',
      url: `/api/employees/${id}`,
      data: employeeParams,
    })
    .then((res) => res.data)
}
