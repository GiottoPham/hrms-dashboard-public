import type {
  InsuranceCommon,
  InsuranceInputParams,
} from '@frontend/types/employee'
import { useFormikContext } from 'formik'
import { TextInput } from '@frontend/framework/TextInput'
export const NumberInput = ({
  label,
  insurance,
  insuranceDetail,
  disabled = false,
}: {
  disabled?: boolean
  label: string
  insurance: keyof InsuranceInputParams
  insuranceDetail: keyof InsuranceCommon
}) => {
  const { values, setFieldValue } = useFormikContext<InsuranceInputParams>()
  return (
    <>
      <TextInput
        id={`${insurance}.${insuranceDetail}`}
        disabled={disabled}
        fullWidth
        label={label}
        name={`${insurance}.${insuranceDetail}`}
        placeholder={label}
        value={
          insurance === 'health'
            ? values.health[insuranceDetail]
            : insurance === 'social'
            ? values.social[insuranceDetail]
            : values.unemployment[insuranceDetail]
        }
        onChange={(e) =>
          setFieldValue(`${insurance}.${insuranceDetail}`, e.target.value)
        }
        InputProps={{
          classes: { root: 'h-10 rounded-lg font-nunito bg-white text-sm' },
        }}
      />
    </>
  )
}
