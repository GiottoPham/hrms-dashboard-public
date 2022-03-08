import type { PropsWithChildren } from 'react'
import type { CellProps } from 'react-table'
import type { LeaveDetail } from '@frontend/types/leave'
import { Checkbox } from '@mui/material'
import { useCheckedLeaveDetail } from '@frontend/state/leave-params'
type LeaveActionProps = PropsWithChildren<
  CellProps<LeaveDetail, LeaveDetail['id']>
>

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const CheckLeaveCell = ({ value: id, row }: LeaveActionProps) => {
  const { checkedLeaveDetail, setCheckedLeaveDetail } = useCheckedLeaveDetail()
  return (
    <Checkbox
      size="small"
      checked={!!checkedLeaveDetail[row.index]}
      onChange={(e) => {
        if (!e.target.checked) {
          setCheckedLeaveDetail((prev) => {
            const newSelectLeave = { ...prev }
            delete newSelectLeave[row.index]
            return newSelectLeave
          })
        } else {
          setCheckedLeaveDetail((prev = {}) => ({
            ...prev,
            [row.index]: id,
          }))
        }
      }}
    />
  )
}
