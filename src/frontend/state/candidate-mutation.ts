import { createCandidatesRequest } from '@frontend/state/candidate-api'
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
