import { CANDIDATE_PARAMS } from '@frontend/state/query-keys'
import type { CandidateParams } from '@frontend/types/candidate-params'
import { useCallback } from 'react'
import { useQuery, useQueryClient } from 'react-query'
import type { Updater } from 'react-query/types/core/utils'

export const useCandidateParams = () => {
  const queryClient = useQueryClient()

  const { data: candidateParams = defaultCandidateParams } =
    useQuery<CandidateParams>({
      queryKey: CANDIDATE_PARAMS,
      queryFn: () => defaultCandidateParams,
    })

  const setCandidateParams = useCallback(
    (updater: Updater<CandidateParams | undefined, CandidateParams>) => {
      queryClient.setQueryData(CANDIDATE_PARAMS, updater)
    },
    [queryClient]
  )

  return {
    candidateParams,
    setCandidateParams,
  }
}
export const defaultCandidateParams: CandidateParams = {
  pagination: 0,
  sortBy: 'id',
  sortOrder: 'asc',
}
