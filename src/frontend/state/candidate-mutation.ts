import {
  createCandidatesRequest,
  promoteCandidate,
} from '@frontend/state/candidate-api'
import { CANDIDATES } from '@frontend/state/query-keys'
import type { CandidateInputParams } from '@frontend/types/candidate'
import { useMutation, useQueryClient } from 'react-query'

export const useCreateCandidate = () => {
  const queryClient = useQueryClient()

  const { mutateAsync, ...rest } = useMutation({
    mutationFn: (candidateParams: CandidateInputParams) =>
      createCandidatesRequest(candidateParams),
    onSuccess: () => {
      queryClient.refetchQueries([CANDIDATES])
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
    },
    retry: false,
  })

  return { promoteCandidate: mutateAsync, ...rest }
}
