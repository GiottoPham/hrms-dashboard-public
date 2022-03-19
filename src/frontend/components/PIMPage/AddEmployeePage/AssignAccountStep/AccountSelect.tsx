import type { AssignAccountInputParams } from '@frontend/types/employee'
import { UserDetail, UserStatus } from '@frontend/types/user'
import { Autocomplete, InputLabel, TextField } from '@mui/material'
import { useFormikContext } from 'formik'

export const AccountSelect = () => {
  const userFake: UserDetail[] = [
    {
      id: 1,
      username: 'khoaideptrai',
      roleid: 1,
      accountStatus: UserStatus.Enable,
      password: 'abcdxyz',
    },
    {
      id: 2,
      username: 'khoaideptrai1',
      roleid: 2,
      accountStatus: UserStatus.Enable,
      password: 'abcdxyz1',
    },
    {
      id: 3,
      username: 'khoaideptrai3',
      roleid: 3,
      accountStatus: UserStatus.Enable,
      password: 'abcdxyz3',
    },
    {
      id: 4,
      username: 'khoaideptrai4',
      roleid: 1,
      accountStatus: UserStatus.Enable,
      password: 'abcdxyz4',
    },
    {
      id: 5,
      username: 'khoaideptrai5',
      roleid: 2,
      accountStatus: UserStatus.Enable,
      password: 'abcdxyz5',
    },
  ]
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
  return (
    <>
      <InputLabel className="text-sm font-nunito font-bold text-black mb-1">
        Available account
      </InputLabel>
      <Autocomplete
        options={userFake}
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
            name="accountId"
            onBlur={handleBlur}
            error={!!errors.accountId && touched.accountId}
            InputProps={{
              classes: {
                root: 'h-10 rounded-lg font-nunito bg-white text-sm pt-1',
              },
              ...params.InputProps,
            }}
          />
        )}
        value={userFake.find((user) => user.id === values?.accountId)}
        onChange={(_, newValue) => setFieldValue('accountId', newValue?.id)}
      />
      {!!errors.accountId && touched.accountId && (
        <p className="text-danger text-sm font-semibold">{errors.accountId}</p>
      )}
    </>
  )
}
