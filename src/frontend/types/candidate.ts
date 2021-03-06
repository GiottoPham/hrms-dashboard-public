export type Candidates = {
  empty: boolean
  last: boolean
  first: boolean
  candidates: Candidate[]
}
export type Candidate = {
  id: number
  vacanciesId: number
  name: string
  jobTitle: string
  appliedDate: string
  email: string
  contact: string
  url: string
}
export type CandidateInputParams = {
  jobRecruitmentId: number
  firstName: string
  lastName: string
  dateOfBirth: string
  email: string
  contact: string
  file: File
}
