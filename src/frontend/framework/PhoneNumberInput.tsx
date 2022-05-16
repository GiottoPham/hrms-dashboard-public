import type { Props as PhoneInputProps } from 'react-phone-number-input'
import cx from 'classnames'
import PhoneInput from 'react-phone-number-input'

export const PhoneNumberInput = (
  props: PhoneInputProps & {
    isError?: boolean
  }
) => {
  return (
    <div
      className={cx(
        'h-10 px-4 border border-gray-300 rounded-lg focus-within:border-2 flex items-center text-sm',
        {
          'focus-within:border-primary': !props.isError,
          'focus-within:border-danger border-danger': props.isError,
          'text-gray-500': props.disabled,
        }
      )}
    >
      <PhoneInput {...props} />
    </div>
  )
}
