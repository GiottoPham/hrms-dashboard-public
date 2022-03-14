import type { LeaveDetail, LeaveParams } from '@frontend/types/leave'
import axios from 'axios'

export const fetchLeaves = (
  leaveParams: LeaveParams
): Promise<LeaveDetail[]> => {
  return axios
    .request({
      method: 'GET',
      url: '/api/leaves',
      params: leaveParams,
    })
    .then((res) => res.data)
}
export const updateLeaveStatusRequest = (listIds: number[], status: number) => {
  return axios
    .request({
      method: 'POST',
      url: `/api/leaves/status`,
      data: {
        listIds,
        status,
      },
    })
    .then((res) => res.data)
}
