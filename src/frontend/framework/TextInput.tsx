import type { TextFieldProps } from '@mui/material'

import cx from 'classnames'
import { useEffect, useMemo, useState } from 'react'
import { debounce } from 'lodash'
import { TextField } from '@mui/material'

import { voidFn } from '@frontend/framework/utils'

export const TextInputDefaultProps = {
  InputProps: {
    classes: {
      root: 'h-12 rounded-lg font-nunito bg-white text-sm',
    },
  },
}

export type TextInputProps = TextFieldProps & {
  id: string
  label?: string
  debounceable?: boolean
}

export const TextInput = ({
  id,
  label,
  value: valueProps,
  fullWidth = false,
  debounceable,
  InputProps = TextInputDefaultProps.InputProps,
  onChange,
  ...props
}: TextInputProps) => {
  const [value, setValue] = useState(valueProps || '')

  useEffect(() => setValue(valueProps), [valueProps])

  const handleChange = useMemo(
    () =>
      debounceable
        ? debounce(onChange || voidFn, 500, { trailing: true })
        : onChange,
    [debounceable, onChange]
  )

  return (
    <label
      htmlFor={id}
      className={cx('flex flex-col', { 'w-full': fullWidth })}
    >
      {label && (
        <span className="text-sm font-nunito font-bold text-black pl-[1px]">
          {label}
        </span>
      )}
      <TextField
        hiddenLabel
        id={id}
        value={value}
        InputProps={InputProps}
        onChange={(e) => {
          setValue(e.target.value)
          if (handleChange) {
            handleChange(e)
          }
        }}
        {...props}
      />
    </label>
  )
}
