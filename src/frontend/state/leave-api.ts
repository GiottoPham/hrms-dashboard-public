import type { LeaveDetails, LeaveParams } from '@frontend/types/leave'
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
