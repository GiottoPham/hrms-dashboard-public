import type { InsuranceInputParams } from '@frontend/types/employee'
import { Autocomplete, InputLabel, TextField } from '@mui/material'
import { useFormikContext } from 'formik'

export const KCBSelect = ({ disabled = false }: { disabled?: boolean }) => {
  const kcbFake = [
    {
      id: 1,
      name: 'Bệnh viện Giao thông Vận tải TP HCM',
    },
    {
      id: 2,
      name: 'Trung tâm y tế Quận 3',
    },
    {
      id: 3,
      name: 'Phòng khám đa khoa (thuộc Cty TNHH PKđa khoa Sài Gòn - TT khám bệnh số 2)',
    },
    {
      id: 4,
      name: 'Phòng khám đa khoa thuộc Công ty TNHH dịch vụ chăm sóc sức khỏe Song An',
    },
  ]
  const { values, setFieldValue } = useFormikContext<InsuranceInputParams>()
  return (
    <>
      <InputLabel className="text-sm font-nunito font-bold text-black mb-1">
        KCB Ban đầu
      </InputLabel>
      <Autocomplete
        disabled={disabled}
        options={kcbFake}
        renderOption={(props, option) => {
          return (
            <li {...props} key={option.id}>
              <p className="text-sm">{option.name}</p>
            </li>
          )
        }}
        isOptionEqualToValue={(option, value) => option.id === value?.id}
        getOptionLabel={(option) => option.name}
        renderInput={(params) => (
          <TextField
            {...params}
            name="kcbId"
            InputProps={{
              classes: {
                root: 'h-10 rounded-lg font-nunito bg-white text-sm pt-1',
              },
              ...params.InputProps,
            }}
          />
        )}
        value={kcbFake.find((kcb) => kcb.id === values.health?.kcbId)}
        onChange={(_, newValue) => setFieldValue('health.kcbId', newValue?.id)}
      />
    </>
  )
}
