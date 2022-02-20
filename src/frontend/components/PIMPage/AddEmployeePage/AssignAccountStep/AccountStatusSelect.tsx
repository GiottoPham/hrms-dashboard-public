import type { AssignAccountInputParams } from '@frontend/types/employee'
import { RadioGroup, FormControlLabel, Radio } from '@mui/material'
import { useFormikContext } from 'formik'
import type { PartialDeep } from 'type-fest'

export const AccountStatusSelect = () => {
  const { values, resetForm } =
    useFormikContext<PartialDeep<AssignAccountInputParams>>()
  return (
    <div className="w-full">
      <RadioGroup
        value={values.type || 'available'}
        onChange={(e) => {
          const DEFAULT_ACCOUNT_DETAIL: PartialDeep<AssignAccountInputParams> =
            {
              type: e.target.value as 'available' | 'new',
              accountId: e.target.value === 'available' ? undefined : null,
              newAccount: e.target.value === 'available' ? null : undefined,
            }
          resetForm({ values: DEFAULT_ACCOUNT_DETAIL })
        }}
      >
        <div className="flex justify-between">
          <div className="w-1/2 flex justify-center">
            <FormControlLabel
              label={'Assign Available Account'}
              value={'available'}
              control={<Radio size="small" />}
              classes={{ label: 'font-nunito text-sm font-bold' }}
            />
          </div>
          <div className="w-1/2 flex justify-center">
            <FormControlLabel
              label={'Create New Account'}
              value={'new'}
              control={<Radio size="small" />}
              classes={{ label: 'font-nunito text-sm font-bold' }}
            />
          </div>
        </div>
      </RadioGroup>
    </div>
  )
}
