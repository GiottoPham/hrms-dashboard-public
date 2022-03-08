import type { PropsWithChildren } from 'react'
import type { CellProps } from 'react-table'
import { Button } from '@mui/material'
import cx from 'classnames'
import type { VacanciesInfo } from '@frontend/types/vacancies-info'
type VacanciesStatusProps = PropsWithChildren<
  CellProps<VacanciesInfo, VacanciesInfo['status']>
>
export const VacanciesStatus = ({ value: status }: VacanciesStatusProps) => {
  return (
    <div className="h-12 flex items-center -ml-8">
      <Button
        classes={{
          root: cx(
            ' text-sm rounded-full font-nunito normal-case shadow-none w-28 mr-5',
            {
              'bg-ontime text-white font-bold border-ontime border-2':
                status === 0,
              'bg-danger text-white font-bold border-danger border-2':
                status === 1,
              'bg-pending text-white font-bold border-pending border-2':
                status === 2,
            }
          ),
        }}
      >
        {status === 0 && 'Recruiting'}
        {status === 1 && 'Expired'}
        {status === 2 && 'Full'}
      </Button>
    </div>
  )
}
