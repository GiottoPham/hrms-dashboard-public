import { useCheckedLeaveDetail } from '@frontend/state/leave-params'
import { Button } from '@mui/material'
import CheckIcon from '@mui/icons-material/Check'
import CloseIcon from '@mui/icons-material/Close'
export const LeaveActionSelectedButton = () => {
  const { checkedLeaveIds, setCheckedLeaveDetail } = useCheckedLeaveDetail()
  return (
    <div className="flex flex-row justify-end items-end">
      <Button
        disabled={checkedLeaveIds.length === 0}
        variant="outlined"
        classes={{
          root: 'w-48 h-10 text-sm rounded-lg font-nunito normal-case shadow-none w-28 mr-5 text-ontime bg-white font-bold border-ontime border-2',
          disabled: 'opacity-60',
        }}
        startIcon={<CheckIcon className="w-5 h-5 text-ontime" />}
        onClick={() => {
          setCheckedLeaveDetail({})
        }}
      >
        Accept all selected
      </Button>
      <Button
        disabled={checkedLeaveIds.length === 0}
        variant="outlined"
        classes={{
          root: 'w-48 h-10 text-sm rounded-lg font-nunito normal-case shadow-none w-28 mr-5 text-danger bg-white font-bold border-danger border-2',
          disabled: 'opacity-60',
        }}
        startIcon={<CloseIcon className="w-5 h-5 text-danger" />}
        onClick={() => {
          setCheckedLeaveDetail({})
        }}
      >
        Ignore all selected
      </Button>
    </div>
  )
}
