import type { Candidate } from '@frontend/types/candidate'

export type CandidateParams = {
  pagination?: number // 1 page = 10 item
  sort?: {
    sortBy: keyof Candidate // string
    sortOrder: 'asc' | 'desc'
  }
  vacanciesId?: number
}
