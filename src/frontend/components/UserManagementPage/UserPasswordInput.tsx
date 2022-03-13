import type { UserInputParams } from '@frontend/types/user'
import { Button } from '@mui/material'
import { useFormikContext } from 'formik'
import { UserInput } from './UserInput'

export const UserPasswordInput = ({
  disabled = false,
}: {
  disabled?: boolean
}) => {
  const { setFieldValue } = useFormikContext<UserInputParams>()
  return (
    <div className="flex flex-col">
      <div className="w-full">
        <UserInput
          fieldName="password"
          label="Password/ Random Password"
          disabled={disabled}
        />
      </div>
      <Button
        disabled={disabled}
        classes={{
          root: 'rounded-full font-nunito normal-case shadow-none text-white h-10 w-1/3 mt-3',
        }}
        color="primary"
        variant="contained"
        onClick={() => {
          const randomString = Math.random().toString(36).substring(2, 10)
          setFieldValue('password', randomString)
        }}
      >
        Generate
      </Button>
    </div>
  )
}
