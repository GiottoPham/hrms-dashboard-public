import type { AssignAccountInputParams } from '@frontend/types/employee'
import type { UserInputParams } from '@frontend/types/user'
import { Autocomplete, InputLabel, TextField } from '@mui/material'
import { FormikErrors, FormikTouched, useFormikContext } from 'formik'
import { useEffect } from 'react'

export const RoleSelect = () => {
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
  useEffect(() => {
    if (values.newAccount?.roleid === undefined)
      setFieldValue(`newAccount.roleid`, null, false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  if (values.newAccount?.roleid === undefined) return null
  return (
    <>
      <InputLabel className="text-sm font-nunito font-bold text-black mb-1">
        Role
      </InputLabel>
      <Autocomplete
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
            name="newAccount.roleid"
            onBlur={handleBlur}
            error={
              !!(
                (errors as FormikErrors<AssignAccountInputParams>)
                  ?.newAccount as FormikErrors<UserInputParams>
              )?.roleid &&
              (
                (touched as FormikTouched<AssignAccountInputParams>)
                  ?.newAccount as FormikTouched<UserInputParams>
              )?.roleid
            }
            InputProps={{
              classes: {
                root: 'h-10 rounded-lg font-nunito bg-white text-sm pt-1',
              },
              ...params.InputProps,
            }}
          />
        )}
        value={roleFake.find((role) => role.id === values.newAccount?.roleid)}
        onChange={(_, newValue) =>
          setFieldValue('newAccount.roleid', newValue?.id || null)
        }
      />
      {!!(
        (errors as FormikErrors<AssignAccountInputParams>)
          ?.newAccount as FormikErrors<UserInputParams>
      )?.roleid &&
        (
          (touched as FormikTouched<AssignAccountInputParams>)
            ?.newAccount as FormikTouched<UserInputParams>
        )?.roleid && (
          <p className="text-danger text-sm font-semibold">
            {
              (
                (errors as FormikErrors<AssignAccountInputParams>)
                  ?.newAccount as FormikErrors<UserInputParams>
              )?.roleid
            }
          </p>
        )}
    </>
  )
}
