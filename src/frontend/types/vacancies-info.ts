export type VacanciesInfos = VacanciesInfo[]
export type VacanciesInfo = {
  id: number
  hiringManagerId: number
  jobId: number
  unitId: number
  publishedDate: string
  expiredDate: string
  quantity: string
  status: number
  postContent: string
}
export type VacanciesEditParams = Omit<VacanciesInfo, 'id'>
