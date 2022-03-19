import type { LeaveDetail, LeaveParams } from '@frontend/types/leave'
import axios from 'axios'

export const fetchLeaves = (
  leaveParams: LeaveParams
): Promise<LeaveDetail[]> => {
  return axios
    .request({
      method: 'GET',
      url: '/api/v1/leaves',
      params: { departmentId: leaveParams.unitId },
    })
    .then((res) => res.data.leaveEmployeeList)
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
