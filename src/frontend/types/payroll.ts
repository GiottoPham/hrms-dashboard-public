import type { Bonus } from '@frontend/types/employee'

export type Payroll = {
  basicSalary: number
  monthlyInfo: {
    actualDay: number
    standardDay: number
    paidLeave: number
    unpaidLeave: number
  }
  totalDerivedSalary: number
  derivedSalary: number
  bonus: Bonus[]
  totalBonus: number
  mandatoryInsurance: number
  taxableIncome: number
  personalIncomeTax: number
  netIncome: number
}
