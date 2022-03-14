import type { PropsWithChildren } from 'react'
import type { CellProps } from 'react-table'
import type { LeaveDetail } from '@frontend/types/leave'
import { IconButton } from '@mui/material'
import CheckIcon from '@mui/icons-material/Check'
import CloseIcon from '@mui/icons-material/Close'
import { useUpdateLeaveStatus } from '@frontend/state/leave-mutation'
type LeaveActionProps = PropsWithChildren<
  CellProps<LeaveDetail, LeaveDetail['id']>
>

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const LeaveActionButton = ({ value: id }: LeaveActionProps) => {
  const { updateLeaveStatus, isLoading } = useUpdateLeaveStatus()

  return (
    <div className="h-12 flex items-center flex-row -ml-5">
      <IconButton
        onClick={() => updateLeaveStatus({ listIds: [id], status: 0 })}
        disabled={isLoading}
      >
        <CheckIcon className="w-5 h-5 text-ontime" />
      </IconButton>
      <IconButton
        onClick={() => updateLeaveStatus({ listIds: [id], status: 1 })}
        disabled={isLoading}
      >
        <CloseIcon className="w-5 h-5 text-danger" />
      </IconButton>
    </div>
  )
}
