export type Candidates = Candidate[]
export type Candidate = {
  id: number
  vacanciesId: number
  name: string
  jobTitle: string
  appliedDate: string
  email: string
  contact: string
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
