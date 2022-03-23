import { VACANCIES } from '@frontend/state/query-keys'
import {
  createVacanciesRequest,
  editVacanciesRequest,
} from '@frontend/state/vacancies-api'
import type { VacanciesEditParams } from '@frontend/types/vacancies-info'
import { useMutation, useQueryClient } from 'react-query'

export const useCreateVacancies = () => {
  const queryClient = useQueryClient()

  const { mutateAsync, ...rest } = useMutation({
    mutationFn: (vacancies: VacanciesEditParams) =>
      createVacanciesRequest(vacancies),
    onSuccess: () => {
      queryClient.refetchQueries([VACANCIES])
    },
    retry: false,
  })

  return { createVacancies: mutateAsync, ...rest }
}
export const useEditVacancies = () => {
  const queryClient = useQueryClient()

  const { mutateAsync, ...rest } = useMutation({
    mutationFn: ({
      id,
      vacancies,
    }: {
      id: number
      vacancies: VacanciesEditParams
    }) => editVacanciesRequest(id, vacancies),
    onSuccess: () => {
      queryClient.refetchQueries([VACANCIES])
    },
    retry: false,
  })

  return { editVacancies: mutateAsync, ...rest }
}
