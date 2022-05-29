import {
  createCandidatesRequest,
  promoteCandidate,
  rejectCandidate,
} from '@frontend/state/candidate-api'
import { CANDIDATES, EMPLOYEES, VACANCIES } from '@frontend/state/query-keys'
import type { CandidateInputParams } from '@frontend/types/candidate'
import { useMutation, useQueryClient } from 'react-query'

export const useCreateCandidate = () => {
  const queryClient = useQueryClient()

  const { mutateAsync, ...rest } = useMutation({
    mutationFn: (candidateParams: CandidateInputParams) =>
      createCandidatesRequest(candidateParams),
    onSuccess: () => {
      queryClient.refetchQueries([CANDIDATES])
      queryClient.refetchQueries([VACANCIES])
    },
    retry: false,
  })

  return { createCandidate: mutateAsync, ...rest }
}
export const usePromoteCandidate = () => {
  const queryClient = useQueryClient()

  const { mutateAsync, ...rest } = useMutation({
    mutationFn: (candidateId: number) => promoteCandidate(candidateId),
    onSuccess: () => {
      queryClient.refetchQueries([CANDIDATES])
      queryClient.refetchQueries([EMPLOYEES])
      queryClient.refetchQueries([VACANCIES])
    },
    retry: false,
  })

  return { promoteCandidate: mutateAsync, ...rest }
}
export const useRejectCandidate = () => {
  const queryClient = useQueryClient()

  const { mutateAsync, ...rest } = useMutation({
    mutationFn: (candidateId: number) => rejectCandidate(candidateId),
    onSuccess: () => {
      queryClient.refetchQueries([CANDIDATES])
      queryClient.refetchQueries([EMPLOYEES])
      queryClient.refetchQueries([VACANCIES])
    },
    retry: false,
  })

  return { rejectCandidate: mutateAsync, ...rest }
}
