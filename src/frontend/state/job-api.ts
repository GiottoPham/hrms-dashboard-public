import type {
  JobDetail,
  JobDetailParams,
  JobInputParams,
} from '@frontend/types/job'
import axios from 'axios'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const fetchJobs = (jobParams: JobDetailParams): Promise<JobDetail[]> => {
  return axios
    .request({
      method: 'GET',
      url: '/api/v1/positions',
    })
    .then((res) => res.data)
}
export const createJobRequest = (jobParams: JobInputParams): Promise<void> => {
  return axios
    .request({
      method: 'POST',
      url: `/api/v1/position`,
      data: {
        name: jobParams.title,
        note: jobParams.note,
        description: jobParams.description,
      },
    })
    .then((res) => res.data)
}
export const editJobRequest = (
  id: number,
  jobParams: JobInputParams
): Promise<void> => {
  return axios
    .request({
      method: 'PUT',
      url: `/api/v1/position/${id}`,
      data: {
        name: jobParams.title,
        note: jobParams.note,
        description: jobParams.description,
      },
    })
    .then((res) => res.data)
}
