import type {
  VacanciesEditParams,
  VacanciesInfos,
} from '@frontend/types/vacancies-info'
import axios from 'axios'

export const fetchVacancies = (): Promise<VacanciesInfos> => {
  return axios
    .request({
      method: 'GET',
      url: '/api/v1/job_recruitments',
    })
    .then((res) => res.data)
}
export const editVacanciesRequest = (
  id: number,
  vacancies: VacanciesEditParams
): Promise<void> => {
  return axios
    .request({
      method: 'PUT',
      url: `/api/v1/job_recruitment/${id}`,
      data: vacancies,
    })
    .then((res) => res.data)
}
export const createVacanciesRequest = (
  vacancies: VacanciesEditParams
): Promise<void> => {
  return axios
    .request({
      method: 'POST',
      url: `/api/v1/job_recruitment`,
      data: vacancies,
    })
    .then((res) => res.data)
}
