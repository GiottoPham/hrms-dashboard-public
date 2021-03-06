export type VacanciesInfos = {
  empty: boolean
  last: boolean
  first: boolean
  vacanciesInfos: VacanciesInfo[]
}
export type VacanciesInfo = {
  id: number
  hiringManagerId: number
  positionId: number
  departmentId: number
  publishedDate: string
  expiredDate: string
  quantity: string
  status: number
  postContent: string
}
export type VacanciesEditParams = Omit<VacanciesInfo, 'id'>
export type NewVacanciesInfo = {
  id: number
  positionTitle: string
  departmentName: string
  postContent: string
}
