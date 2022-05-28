import type {
  CandidateInputParams,
  Candidates,
} from '@frontend/types/candidate'
import type { CandidateParams } from '@frontend/types/candidate-params'
import axios from 'axios'

export const fetchCandidates = (
  candidateParams: CandidateParams
): Promise<Candidates> => {
  return axios
    .request({
      method: 'GET',
      url: '/api/v1/candidates',
      params: candidateParams,
    })
    .then((res) => res.data)
}
export const createCandidatesRequest = (
  candidateParams: Partial<CandidateInputParams>
): Promise<void> => {
  const candidateFile = candidateParams.file
  const formData = new FormData()
  if (candidateFile)
    formData.append('file', candidateFile as File, candidateFile.name)
  delete candidateParams.file
  formData.append('data', JSON.stringify(candidateParams))
  return axios
    .request({
      method: 'POST',
      url: '/api/unauthorized/candidate',
      data: formData,
    })
    .then((res) => res.data)
}
export const promoteCandidate = (candidateId: number): Promise<void> => {
  return axios
    .request({
      method: 'POST',
      url: `/api/v1/promote/${candidateId}`,
    })
    .then((res) => res.data)
}
