import { UserInputParams, UserStatus } from '@frontend/types/user'
import { RadioGroup, FormControlLabel, FormLabel, Radio } from '@mui/material'
import { useFormikContext } from 'formik'

export const StatusInput = ({ disabled = false }: { disabled?: boolean }) => {
  const { values, setFieldValue } = useFormikContext<UserInputParams>()
  return (
    <RadioGroup
      value={values.status}
      onChange={(e) => setFieldValue('status', e.target.value)}
    >
      <FormLabel classes={{ root: 'text-sm font-nunito font-bold text-black' }}>
        Status
      </FormLabel>
      <div className="flex space-x-5">
        <FormControlLabel
          disabled={disabled}
          label={'Enable'}
          value={UserStatus.Enable}
          control={<Radio size="small" />}
          classes={{ label: 'font-nunito text-sm font-bold' }}
        />
        <FormControlLabel
          disabled={disabled}
          label={'Disable'}
          value={UserStatus.Disable}
          control={<Radio size="small" />}
          classes={{ label: 'font-nunito text-sm font-bold' }}
        />
      </div>
    </RadioGroup>
  )
}
