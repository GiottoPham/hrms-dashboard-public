import type {
  NewVacanciesInfo,
  VacanciesEditParams,
  VacanciesInfos,
} from '@frontend/types/vacancies-info'
import type { VacanciesParams } from '@frontend/types/vacancies-params'
import axios from 'axios'

export const fetchVacancies = (
  params: VacanciesParams
): Promise<VacanciesInfos> => {
  return axios
    .request({
      method: 'GET',
      url: '/api/v1/job_recruitments',
      params,
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
export const fetchVacanciesUnauth = (): Promise<NewVacanciesInfo[]> => {
  return axios
    .request({
      method: 'GET',
      url: '/api/unauthorized/job_recruitments',
    })
    .then((res) => res.data)
}
