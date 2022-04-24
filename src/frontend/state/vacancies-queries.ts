import { VACANCIES } from '@frontend/state/query-keys'

import type { AxiosError } from 'axios'
import { useQuery } from 'react-query'

import type {
  NewVacanciesInfo,
  VacanciesInfos,
} from '@frontend/types/vacancies-info'
import {
  fetchVacancies,
  fetchVacanciesUnauth,
} from '@frontend/state/vacancies-api'
import type { VacanciesParams } from '@frontend/types/vacancies-params'

export const useVacancies = (vacanciesParams: VacanciesParams) => {
  const { data: vacancies, ...rest } = useQuery<VacanciesInfos, AxiosError>({
    queryKey: [VACANCIES, vacanciesParams],
    queryFn: () => fetchVacancies(vacanciesParams),
    retry: false,
  })

  return { vacancies, ...rest }
}
export const useVacanciesUnauth = () => {
  const { data: vacancies, ...rest } = useQuery<NewVacanciesInfo[], AxiosError>(
    {
      queryKey: [VACANCIES, 'unauth'],
      queryFn: () => fetchVacanciesUnauth(),
      retry: false,
    }
  )

  return { vacancies, ...rest }
}
