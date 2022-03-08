import type { PropsWithChildren } from 'react'
import type { CellProps } from 'react-table'
import type { LeaveDetail } from '@frontend/types/leave'
import { Button } from '@mui/material'
import cx from 'classnames'
import CheckIcon from '@mui/icons-material/Check'
import CloseIcon from '@mui/icons-material/Close'
import AutorenewIcon from '@mui/icons-material/Autorenew'
type LeaveStatusProps = PropsWithChildren<
  CellProps<LeaveDetail, LeaveDetail['status']>
>

export const LeaveStatusButton = ({ value: status }: LeaveStatusProps) => {
  return (
    <div className="h-12 flex items-center -ml-8">
      <Button
        variant="outlined"
        classes={{
          root: cx(
            ' text-sm rounded-full font-nunito normal-case shadow-none w-28 mr-5',
            {
              'text-ontime bg-white font-bold border-ontime border-2':
                status === 0,
              'text-danger bg-white font-bold border-danger border-2':
                status === 1,
              'text-pending bg-white font-bold border-pending border-2':
                status === 2,
            }
          ),
        }}
        startIcon={
          status === 0 ? (
            <CheckIcon className="w-5 h-5 text-ontime" />
          ) : status === 1 ? (
            <CloseIcon className="w-5 h-5 text-danger" />
          ) : (
            <AutorenewIcon className="w-5 h-5 text-pending" />
          )
        }
      >
        {status === 0 && 'Accepted'}
        {status === 1 && 'Ignored'}
        {status === 2 && 'Pending'}
      </Button>
    </div>
  )
}
