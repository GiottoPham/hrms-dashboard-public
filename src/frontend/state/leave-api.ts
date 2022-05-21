import type {
  LeaveDetails,
  LeaveNotification,
  LeaveParams,
} from '@frontend/types/leave'
import axios from 'axios'

export const fetchLeaves = (
  leaveParams: LeaveParams
): Promise<LeaveDetails> => {
  return axios
    .request({
      method: 'GET',
      url: '/api/v1/leaves',
      params: leaveParams,
    })
    .then((res) => res.data)
}
export const updateLeaveStatusRequest = (listIds: number[], status: number) => {
  return axios
    .request({
      method: 'POST',
      url: `/api/v1/leaves/status`,
      data: {
        listIds,
        status,
      },
    })
    .then((res) => res.data)
}
export const sendNotification = ({ title, body }: LeaveNotification) => {
  const newAxios = axios.create({
    baseURL: 'https://arcane-taiga-55468.herokuapp.com/https://exp.host',
    headers: {
      Authorization: '',
    },
  })
  return newAxios
    .request({
      method: 'POST',
      url: `/--/api/v2/push/send`,
      data: {
        to: [
          'ExponentPushToken[nywcawIdX9ivla1Drzr2y3]',
          'ExponentPushToken[HBEcdaIu5Kk4PL1LYdpXop]',
        ],
        title,
        body,
        sound: 'default',
      },
    })
    .then((res) => res.data)
}
