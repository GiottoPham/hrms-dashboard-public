import type { UserInputParams } from '@frontend/types/user'
import { Autocomplete, InputLabel, TextField } from '@mui/material'
import { useFormikContext } from 'formik'

export const UserRoleSelect = ({
  disabled = false,
}: {
  disabled?: boolean
}) => {
  const roleFake = [
    {
      id: 1,
      name: 'User',
    },
    {
      id: 2,
      name: 'Super User',
    },
    {
      id: 3,
      name: 'Admin',
    },
  ]
  const { values, setFieldValue, handleBlur, errors, touched } =
    useFormikContext<UserInputParams>()
  return (
    <>
      <InputLabel className="text-sm font-nunito font-bold text-black mb-1">
        Role
      </InputLabel>
      <Autocomplete
        disabled={disabled}
        options={roleFake}
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
            name="roleid"
            onBlur={handleBlur}
            error={!!errors.roleid && touched.roleid}
            InputProps={{
              classes: {
                root: 'h-10 rounded-lg font-nunito bg-white text-sm pt-1',
              },
              ...params.InputProps,
            }}
          />
        )}
        value={roleFake.find((role) => role.id === values?.roleid)}
        onChange={(_, newValue) => setFieldValue('roleid', newValue?.id)}
      />
      {!!errors.roleid && touched.roleid && (
        <p className="text-danger text-sm font-semibold">{errors.roleid}</p>
      )}
    </>
  )
}
