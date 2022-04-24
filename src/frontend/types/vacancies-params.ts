import type { VacanciesInfo } from '@frontend/types/vacancies-info'

export type VacanciesParams = {
  pagination: number // 1 page = 10 item

  sortBy: keyof VacanciesInfo // string
  sortOrder: 'asc' | 'desc'
}
