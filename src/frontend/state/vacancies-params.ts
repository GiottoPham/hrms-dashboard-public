import { VACANCIES_PARAMS } from '@frontend/state/query-keys'
import type { VacanciesParams } from '@frontend/types/vacancies-params'
import { useCallback } from 'react'
import { useQuery, useQueryClient } from 'react-query'
import type { Updater } from 'react-query/types/core/utils'

export const useVacanciesParams = () => {
  const queryClient = useQueryClient()

  const { data: vacanciesParams = defaultVacanciesParams } =
    useQuery<VacanciesParams>({
      queryKey: VACANCIES_PARAMS,
      queryFn: () => defaultVacanciesParams,
    })

  const setVacanciesParams = useCallback(
    (updater: Updater<VacanciesParams | undefined, VacanciesParams>) => {
      queryClient.setQueryData(VACANCIES_PARAMS, updater)
    },
    [queryClient]
  )

  return {
    vacanciesParams,
    setVacanciesParams,
  }
}
export const defaultVacanciesParams: VacanciesParams = {
  pagination: 0,
  sortBy: 'id',
  sortOrder: 'asc',
}
