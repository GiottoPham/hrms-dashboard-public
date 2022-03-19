import type { Candidates } from '@frontend/types/candidate'
import type { CandidateParams } from '@frontend/types/candidate-params'
import axios from 'axios'

export const fetchCandidates = (
  candidateParams: CandidateParams
): Promise<Candidates> => {
  return axios
    .request({
      method: 'GET',
      url: '/api/v1/candidates',
      params: {
        jobRecruitmentId: candidateParams.vacanciesId,
      },
    })
    .then((res) => res.data.candidates)
}
