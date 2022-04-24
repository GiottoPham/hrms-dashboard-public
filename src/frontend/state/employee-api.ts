import type { Employee, InsuranceInputParams } from '@frontend/types/employee'
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
      params: {
        isHavingDepartment: employeeParams.isHavingDepartment,
      },
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
      url: `/api/v1/employee`,
      data: formData,
    })
    .then((res) => res.data)
}
export const editEmployeeRequest = (
  id: number,
  employeeParams: PartialDeep<
    Omit<EmployeeInputParams, 'accountDetail'> & {
      insuranceDetail: InsuranceInputParams
    }
  >
): Promise<void> => {
  const employeeAvatar = employeeParams.personalDetail?.avatar
  const formData = new FormData()
  if (employeeAvatar)
    formData.append('avatar', employeeAvatar as File, employeeAvatar.name)
  delete employeeParams.personalDetail?.avatar
  formData.append('data', JSON.stringify(employeeParams))
  return axios
    .request({
      method: 'PUT',
      url: `/api/v1/employee/${id}`,
      data: formData,
    })
    .then((res) => res.data)
}

export const loadImageEmployee = (id?: string) => {
  if (!id) return Promise.resolve({} as File)
  return fetch(
    `https://arcane-taiga-55468.herokuapp.com/https://drive.google.com/uc?id=${id}`
  )
    .then((res) => res.blob())
    .then(
      (blob) =>
        new File([blob], `new-image-${id}`, {
          lastModified: new Date().getTime(),
          type: blob.type,
        })
    )
}
