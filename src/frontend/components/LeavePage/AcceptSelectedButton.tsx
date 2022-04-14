import { useCheckedLeaveDetail } from '@frontend/state/leave-params'
import { Button, CircularProgress } from '@mui/material'
import CheckIcon from '@mui/icons-material/Check'
import { useUpdateLeaveStatus } from '@frontend/state/leave-mutation'
export const AcceptSelectedButton = () => {
  const { checkedLeaveIds, setCheckedLeaveDetail } = useCheckedLeaveDetail()
  const { updateLeaveStatus, isLoading } = useUpdateLeaveStatus()
  return (
    <Button
      disabled={checkedLeaveIds.length === 0}
      variant="outlined"
      classes={{
        root: 'h-10 text-sm rounded-lg font-nunito normal-case shadow-none mr-5 text-ontime bg-white font-bold border-ontime border-2',
        disabled: 'opacity-60',
      }}
      startIcon={
        isLoading ? (
          <CircularProgress size={20} thickness={5} className="text-ontime" />
        ) : (
          <CheckIcon className="w-5 h-5 text-ontime" />
        )
      }
      onClick={() => {
        updateLeaveStatus({ listIds: checkedLeaveIds, status: 0 }).finally(() =>
          setCheckedLeaveDetail({})
        )
      }}
    >
      Accept all selected
    </Button>
  )
}
