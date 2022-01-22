import { useSnackbar, SnackbarContent } from 'notistack'
import CheckIcon from '@mui/icons-material/Check'
import CloseIcon from '@mui/icons-material/Close'
import WarningIcon from '@mui/icons-material/Warning'
import InfoIcon from '@mui/icons-material/Info'
import { IconButton } from '@mui/material'
import { forwardRef, useCallback } from 'react'
import cx from 'classnames'
interface Props {
  id: string | number
  message: string | React.ReactNode
  variant: 'success' | 'error' | 'warning' | 'info'
}
export const Toast = forwardRef<HTMLDivElement, Props>(
  ({ id, message, variant }, ref) => {
    const { closeSnackbar } = useSnackbar()
    const handleDismiss = useCallback(() => {
      closeSnackbar(id)
    }, [id, closeSnackbar])

    return (
      <SnackbarContent ref={ref}>
        <div
          className={cx(
            'relative flex items-center py-3 w-[450px] rounded-lg shadow-lg bg-white border-t-4 ',
            {
              'border-primary': variant === 'success',
              'border-danger': variant === 'error',
              'border-warning': variant === 'warning',
              'border-info-500': variant === 'info',
            }
          )}
        >
          <div
            className={cx(
              'flex items-center justify-center rounded-full h-10 w-10 ml-5 mr-9',
              {
                'bg-primary': variant === 'success',
                'bg-danger': variant === 'error',
                'bg-warning': variant === 'warning',
                'bg-info-500': variant === 'info',
              }
            )}
          >
            <div>
              {variant === 'success' ? (
                <CheckIcon className="text-white w-5" />
              ) : variant === 'error' ? (
                <CloseIcon className="text-white w-5" />
              ) : variant === 'warning' ? (
                <WarningIcon className="text-white w-5" />
              ) : (
                <InfoIcon className="text-white w-5" />
              )}
            </div>
          </div>
          <div className="space-y-3 font-inter">
            <p
              className={cx('text-lg font-semibold', {
                'text-primary': variant === 'success',
                'text-danger': variant === 'error',
                'text-warning': variant === 'warning',
                'text-info-500': variant === 'info',
              })}
            >
              {variant === 'success'
                ? 'Success!'!
                : variant === 'error'
                ? 'Error!'
                : variant === 'warning'
                ? 'Warning!'
                : 'Info Alert!'}
            </p>
            <p className="text-sm font-medium">{message}</p>
          </div>
          <IconButton
            className="absolute top-2 right-4"
            onClick={handleDismiss}
          >
            <CloseIcon className="text-black w-4 h-4" />
          </IconButton>
        </div>
      </SnackbarContent>
    )
  }
)
Toast.displayName = 'Toast'
