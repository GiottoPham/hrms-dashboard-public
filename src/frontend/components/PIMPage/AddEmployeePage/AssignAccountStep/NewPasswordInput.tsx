import type { UserInputParams } from '@frontend/types/user'
import { Button } from '@mui/material'
import { useFormikContext } from 'formik'
import { AccountInput } from './AccountInput'

export const NewPasswordInput = () => {
  const { setFieldValue } = useFormikContext<UserInputParams>()
  return (
    <div className="flex flex-row">
      <AccountInput fieldName="password" label="Password/ Random Password" />
      <Button
        classes={{
          root: 'rounded-full font-nunito normal-case shadow-none text-white h-10 self-end ml-3',
        }}
        color="primary"
        variant="contained"
        onClick={() => {
          const randomString = Math.random().toString(36).substring(2, 10)
          setFieldValue('newAccount.password', randomString)
        }}
      >
        Generate
      </Button>
    </div>
  )
}
