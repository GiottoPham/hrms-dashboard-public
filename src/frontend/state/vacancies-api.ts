import type { VacanciesInfos } from '@frontend/types/vacancies-info'
import axios from 'axios'

export const fetchVacancies = (): Promise<VacanciesInfos> => {
  return axios
    .request({
      method: 'GET',
      url: '/api/v1/job_recruitments',
    })
    .then((res) => res.data)
}
