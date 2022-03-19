import { VACANCIES } from '@frontend/state/query-keys'

import type { AxiosError } from 'axios'
import { useQuery } from 'react-query'

import type { VacanciesInfos } from '@frontend/types/vacancies-info'
import { fetchVacancies } from '@frontend/state/vacancies-api'

export const useVacancies = () => {
  const { data: vacancies, ...rest } = useQuery<VacanciesInfos, AxiosError>({
    queryKey: [VACANCIES],
    queryFn: () => fetchVacancies(),
    retry: false,
  })

  return { vacancies, ...rest }
}
