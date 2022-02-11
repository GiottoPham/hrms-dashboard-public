import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'

import cx from 'classnames'
export const UpDownIcon = ({ isUp }: { isUp?: boolean }) => {
  const isDown = isUp !== undefined && isUp === false
  return (
    <div className="flex flex-col">
      <KeyboardArrowUpIcon
        className={cx('w-5 h-5', {
          'text-white': isUp,
          'text-primary': !isUp,
        })}
      />
      <KeyboardArrowDownIcon
        className={cx('w-5 h-5 -mt-2', {
          'text-white': isDown,
          'text-primary': !isDown,
        })}
      />
    </div>
  )
}
