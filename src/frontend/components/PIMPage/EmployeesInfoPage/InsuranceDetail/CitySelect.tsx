import { useCities } from '@frontend/state/countries-queries'
import type { InsuranceInputParams } from '@frontend/types/employee'
import { InputLabel, MenuItem, Select } from '@mui/material'
import { useFormikContext } from 'formik'

export const CitySelect = ({
  label,
  disabled = false,
}: {
  label: string
  disabled?: boolean
}) => {
  const { values, setFieldValue } = useFormikContext<InsuranceInputParams>()
  const { cities } = useCities()
  return (
    <>
      <InputLabel className="text-sm font-nunito font-bold text-black mb-1">
        {label}
      </InputLabel>
      <Select
        disabled={disabled}
        name={'health.cityId'}
        fullWidth
        value={values.health.cityId}
        onChange={(e) => setFieldValue('health.cityId', e.target.value)}
        componentsProps={{
          root: {
            className: 'font-nunito text-sm rounded-lg h-10 ',
          },
          input: {
            className: 'w-full py-1.5',
          },
        }}
      >
        {cities?.map(({ province_id, province_name }) => (
          <MenuItem
            key={province_id}
            value={province_id}
            className="font-nunito text-sm"
          >
            {province_name}
          </MenuItem>
        ))}
      </Select>
    </>
  )
}
