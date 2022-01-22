import { useSnackbar as useDefaultSnackbar, OptionsObject } from 'notistack'
import { Toast } from '@frontend/framework/Toast/Toast'

export const useToast = () => {
  const { enqueueSnackbar } = useDefaultSnackbar()

  const openToast = (
    message?: string,
    options?: OptionsObject &
      Partial<{ variant: 'success' | 'error' | 'warning' | 'info' }>
  ) => {
    enqueueSnackbar(message, {
      ...options,
      content: (key) => {
        const { variant } = options || { variant: undefined }
        return <Toast id={key} message={message} variant={variant || 'error'} />
      },
    })
  }

  return { openToast }
}
