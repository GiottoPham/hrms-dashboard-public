import { useUserParams } from '@frontend/state/user-params'
import { useUsers } from '@frontend/state/user-queries'
import type { AssignAccountInputParams } from '@frontend/types/employee'
import { Autocomplete, InputLabel, TextField } from '@mui/material'
import { useFormikContext } from 'formik'

export const AccountSelect = () => {
  const { userParams } = useUserParams()
  const { users } = useUsers({ ...userParams, available: true })
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
    useFormikContext<AssignAccountInputParams>()
  if (!users) return null
  return (
    <>
      <InputLabel className="text-sm font-nunito font-bold text-black mb-1">
        Available account
      </InputLabel>
      <Autocomplete
        options={users}
        renderOption={(props, option) => {
          return (
            <li {...props} key={option.id}>
              <p className="text-sm">
                {option.username} -{' '}
                {roleFake.find((role) => role.id === option.roleid)?.name}
              </p>
            </li>
          )
        }}
        isOptionEqualToValue={(option, value) => option.id === value?.id}
        getOptionLabel={(option) => option.username}
        renderInput={(params) => (
          <TextField
            {...params}
            name="id"
            onBlur={handleBlur}
            error={!!errors.id && touched.id}
            InputProps={{
              classes: {
                root: 'h-10 rounded-lg font-nunito bg-white text-sm pt-1',
              },
              ...params.InputProps,
            }}
          />
        )}
        value={users.find((user) => user.id === values?.id)}
        onChange={(_, newValue) => setFieldValue('id', newValue?.id)}
      />
      {!!errors.id && touched.id && (
        <p className="text-danger text-sm font-semibold">{errors.id}</p>
      )}
    </>
  )
}
