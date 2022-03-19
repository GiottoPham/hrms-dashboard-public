import type { AssignAccountInputParams } from '@frontend/types/employee'
import { UserStatus } from '@frontend/types/user'
import { RadioGroup, FormControlLabel, FormLabel, Radio } from '@mui/material'
import { useFormikContext } from 'formik'
import { useEffect } from 'react'

export const NewAccountStatusInput = () => {
  const { values, setFieldValue } = useFormikContext<AssignAccountInputParams>()
  useEffect(() => {
    if (!values.newAccount?.accountStatus)
      setFieldValue('newAccount.accountStatus', UserStatus.Enable, false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  if (!values.newAccount?.accountStatus) return null
  return (
    <RadioGroup
      name="newAccount.accountStatus"
      value={values.newAccount?.accountStatus}
      onChange={(e) =>
        setFieldValue('newAccount.accountStatus', e.target.value)
      }
    >
      <FormLabel classes={{ root: 'text-sm font-nunito font-bold text-black' }}>
        Status
      </FormLabel>
      <div className="flex space-x-5">
        <FormControlLabel
          label={'Enable'}
          value={UserStatus.Enable}
          control={<Radio size="small" />}
          classes={{ label: 'font-nunito text-sm font-bold' }}
        />
        <FormControlLabel
          label={'Disable'}
          value={UserStatus.Disable}
          control={<Radio size="small" />}
          classes={{ label: 'font-nunito text-sm font-bold' }}
        />
      </div>
    </RadioGroup>
  )
}
