import type { Shift, ShiftDetailInput } from '@frontend/types/shift'
import axios from 'axios'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const fetchShifts = (): Promise<Shift[]> => {
  return axios
    .request({
      method: 'GET',
      url: '/api/v1/shifts',
    })
    .then((res) => res.data)
}
export const createShiftRequest = (
  shiftParams: ShiftDetailInput
): Promise<void> => {
  return axios
    .request({
      method: 'POST',
      url: `/api/v1/shift`,
      data: {
        name: shiftParams.name,
        from: shiftParams.timeIn,
        to: shiftParams.timeOut,
      },
    })
    .then((res) => res.data)
}
export const editShiftRequest = (
  id: number,
  shiftParams: ShiftDetailInput
): Promise<void> => {
  return axios
    .request({
      method: 'PUT',
      url: `/api/v1/shift/${id}`,
      data: {
        name: shiftParams.name,
        from: shiftParams.timeIn,
        to: shiftParams.timeOut,
      },
    })
    .then((res) => res.data)
}
