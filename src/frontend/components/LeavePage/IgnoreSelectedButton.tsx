import {
  useCheckedLeaveDetail,
  useLeaveParams,
} from '@frontend/state/leave-params'
import { Button, CircularProgress } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import {
  useSendLeaveNotifications,
  useUpdateLeaveStatus,
} from '@frontend/state/leave-mutation'
import { formatDate } from '@frontend/framework/utils/date'
export const IgnoreSelectedButton = () => {
  const { checkedLeaveIds, setCheckedLeaveDetail } = useCheckedLeaveDetail()
  const { updateLeaveStatus, isLoading } = useUpdateLeaveStatus()
  const { sendNotifications } = useSendLeaveNotifications()
  const {
    leaveParams: { date },
  } = useLeaveParams()
  return (
    <Button
      disabled={checkedLeaveIds.length === 0}
      variant="outlined"
      classes={{
        root: 'h-10 text-sm rounded-lg font-nunito normal-case shadow-none mr-5 text-danger bg-white font-bold border-danger border-2',
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
        updateLeaveStatus({ listIds: checkedLeaveIds, status: 1 })
          .then(() => {
            sendNotifications({
              title: 'Ignore Leaves',
              body: `All of your leaves created on ${formatDate(
                date,
                'MM/dd/yyyy'
              )} were ignored`,
            })
          })
          .finally(() => setCheckedLeaveDetail({}))
      }}
    >
      Ignore all selected
    </Button>
  )
}
