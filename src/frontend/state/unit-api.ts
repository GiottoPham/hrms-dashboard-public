import type { Unit, UnitInputParams } from '@frontend/types/unit'
import axios from 'axios'

export const fetchUnits = (nested?: boolean): Promise<Unit[]> => {
  return axios
    .request({
      method: 'GET',
      url: '/api/v1/departments',
      params: {
        nested,
      },
    })
    .then((res) => res.data)
}
export const createUnitRequest = (
  unitParams: UnitInputParams
): Promise<void> => {
  return axios
    .request({
      method: 'POST',
      url: `/api/units`,
      data: unitParams,
    })
    .then((res) => res.data)
}
export const editUnitRequest = (
  id: number,
  unitParams: UnitInputParams
): Promise<void> => {
  return axios
    .request({
      method: 'PUT',
      url: `/api/units/${id}`,
      data: unitParams,
    })
    .then((res) => res.data)
}
export const deleteUnitRequest = (id: number): Promise<void> => {
  return axios
    .request({
      method: 'DELETE',
      url: `/api/units/${id}`,
    })
    .then((res) => res.data)
}
