import { CANDIDATES } from '@frontend/state/query-keys'

import type { AxiosError } from 'axios'
import { useQuery } from 'react-query'

import type { CandidateParams } from '@frontend/types/candidate-params'
import type { Candidates } from '@frontend/types/candidate'
import { fetchCandidates } from '@frontend/state/candidate-api'

export const useCandidates = (candidateParams: CandidateParams) => {
  const { data: candidates, ...rest } = useQuery<Candidates, AxiosError>({
    queryKey: [CANDIDATES],
    queryFn: () => fetchCandidates(candidateParams),
    retry: false,
  })

  return { candidates, ...rest }
}
