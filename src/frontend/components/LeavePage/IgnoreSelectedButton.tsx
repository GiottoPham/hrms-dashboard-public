import { useCheckedLeaveDetail } from '@frontend/state/leave-params'
import { Button, CircularProgress } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { useUpdateLeaveStatus } from '@frontend/state/leave-mutation'
export const IgnoreSelectedButton = () => {
  const { checkedLeaveIds, setCheckedLeaveDetail } = useCheckedLeaveDetail()
  const { updateLeaveStatus, isLoading } = useUpdateLeaveStatus()
  return (
    <Button
      disabled={checkedLeaveIds.length === 0}
      variant="outlined"
      classes={{
        root: 'w-48 h-10 text-sm rounded-lg font-nunito normal-case shadow-none w-28 mr-5 text-danger bg-white font-bold border-danger border-2',
        disabled: 'opacity-60',
      }}
      startIcon={
        isLoading ? (
          <CircularProgress size={20} thickness={5} className="text-danger" />
        ) : (
          <CloseIcon className="w-5 h-5 text-danger" />
        )
      }
      onClick={() => {
        updateLeaveStatus({ listIds: checkedLeaveIds, status: 1 }).finally(() =>
          setCheckedLeaveDetail({})
        )
      }}
    >
      Ignore all selected
    </Button>
  )
}
