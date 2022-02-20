import type { JobDetailInputParams } from '@frontend/types/employee'
import { Autocomplete, InputLabel, TextField } from '@mui/material'
import { useFormikContext } from 'formik'

export const UnitSelect = () => {
  const LIST_UNIT = [
    {
      id: 1,
      name: 'CEO',
      type: 'head',
      peopleNumber: 20,
      description: 'abcxyz',
      headOfUnit: 'Pham Gia Nguyen',
    },
    {
      id: 2,
      name: 'ALO',
      type: 'sub-head',
      peopleNumber: 10,
      description: 'abcxyz',
      headOfUnit: 'Pham Khang Nguyen',
    },
    {
      id: 3,
      name: 'BLE',
      type: 'sub',
      peopleNumber: 5,
      description: 'abcxyz',
      headOfUnit: 'Truong Anh Bao',
    },
    {
      id: 4,
      name: 'BLE2',
      type: 'sub',
      peopleNumber: 5,
      description: 'abcxyz',
      headOfUnit: 'Truong Anh Bao',
    },

    {
      id: 5,
      name: 'ALO2',
      subUnit: null,
      type: 'sub-head',
      peopleNumber: 10,
      description: 'abcxyz',
      headOfUnit: 'Truong Anh Bao',
    },

    {
      id: 6,
      name: 'CEO',
      type: 'head',
      peopleNumber: 20,
      description: 'abcxyz',
      headOfUnit: 'Pham Gia Nguyen',
    },
    {
      id: 7,
      name: 'CEO',
      type: 'sub-head',
      peopleNumber: 10,
      description: 'abcxyz',
      headOfUnit: 'Pham Khang Nguyen',
    },
    {
      id: 8,
      name: 'CEO',
      type: 'sub',
      peopleNumber: 5,
      description: 'abcxyz',
      headOfUnit: 'Truong Anh Bao',
    },
    {
      id: 9,
      name: 'CEO',
      type: 'sub',
      peopleNumber: 5,
      description: 'abcxyz',
      headOfUnit: 'Truong Anh Bao',
    },

    {
      id: 10,
      name: 'CEO',
      subUnit: null,
      type: 'sub-head',
      peopleNumber: 10,
      description: 'abcxyz',
      headOfUnit: 'Truong Anh Bao',
    },
  ]
  const { values, setFieldValue, handleBlur, errors, touched } =
    useFormikContext<JobDetailInputParams>()
  return (
    <>
      <InputLabel className="text-sm font-nunito font-bold text-black mb-1">
        Unit
      </InputLabel>
      <Autocomplete
        options={LIST_UNIT}
        renderOption={(props, option) => {
          return (
            <li {...props} key={option.id}>
              <p className="text-sm">{option.name}</p>
            </li>
          )
        }}
        isOptionEqualToValue={(option, value) => option.id === value.id}
        getOptionLabel={(option) => option.name}
        renderInput={(params) => (
          <TextField
            {...params}
            name="unitId"
            onBlur={handleBlur}
            error={!!errors.unitId && touched.unitId}
            InputProps={{
              classes: {
                root: 'h-10 rounded-lg font-nunito bg-white text-sm pt-1',
              },
              ...params.InputProps,
            }}
          />
        )}
        value={LIST_UNIT.find((unit) => unit.id === values.unitId)}
        onChange={(_, newValue) => setFieldValue('unitId', newValue?.id)}
      />
      {!!errors.unitId && touched.unitId && (
        <p className="text-danger text-sm font-semibold">{errors.unitId}</p>
      )}
    </>
  )
}
