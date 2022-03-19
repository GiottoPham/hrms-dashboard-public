import type { Employee } from '@frontend/types/employee'

export type EmployeeParams = {
  pagination?: number
  sort: {
    sortBy: keyof (Employee['jobDetail'] &
      Employee['personalDetail'] & { id: number })
    sortOrder: 'asc' | 'desc'
  }
}
