import { fetchJobs } from '@frontend/state/job-api'
import { JOBS } from '@frontend/state/query-keys'
import type { JobDetail, JobDetailParams } from '@frontend/types/job'
import type { AxiosError } from 'axios'
import { useQuery } from 'react-query'

export const useJobs = (jobParams: JobDetailParams) => {
  const { data: jobs, ...rest } = useQuery<JobDetail[], AxiosError>({
    queryKey: [JOBS, jobParams],
    queryFn: () => fetchJobs(jobParams),
    retry: false,
  })

  return { jobs, ...rest }
}
