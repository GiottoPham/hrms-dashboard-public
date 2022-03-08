import type { Employee } from '@frontend/types/employee'
import type { VacanciesEditParams } from '@frontend/types/vacancies-info'
import { Autocomplete, InputLabel, TextField } from '@mui/material'
import { useFormikContext } from 'formik'
import type { PartialDeep } from 'type-fest'

export const VacanciesHiringManagerSelect = ({
  disabled = false,
}: {
  disabled?: boolean
}) => {
  const employeesFake: PartialDeep<Employee>[] = [
    {
      id: 1,
      personalDetail: {
        avatar: 'https://www.w3schools.com/howto/img_avatar.png',
        firstName: 'Nguyen',
        lastName: 'Pham',
        email: 'giotto2015.py@gmail.com',
        phone: '0854662633',
      },
      jobDetail: {
        jobId: 1,
        unitId: 2,
      },
    },
    {
      id: 2,
      personalDetail: {
        avatar: 'https://www.w3schools.com/howto/img_avatar.png',
        firstName: 'Nguyen',
        lastName: 'Pham',
        email: 'giotto2015.py@gmail.com',
        phone: '0854662633',
      },
      jobDetail: {
        jobId: 1,
        unitId: 2,
      },
    },
    {
      id: 3,
      personalDetail: {
        avatar: 'https://www.w3schools.com/howto/img_avatar.png',
        firstName: 'Nguyen',
        lastName: 'Pham',
        email: 'giotto2015.py@gmail.com',
        phone: '0854662633',
      },
      jobDetail: {
        jobId: 1,
        unitId: 2,
      },
    },
    {
      id: 4,
      personalDetail: {
        avatar: 'https://www.w3schools.com/howto/img_avatar.png',
        firstName: 'Nguyen',
        lastName: 'Pham',
        email: 'giotto2015.py@gmail.com',
        phone: '0854662633',
      },
      jobDetail: {
        jobId: 1,
        unitId: 2,
      },
    },
    {
      id: 5,
      personalDetail: {
        avatar: 'https://www.w3schools.com/howto/img_avatar.png',
        firstName: 'Nguyen',
        lastName: 'Pham',
        email: 'giotto2015.py@gmail.com',
        phone: '0854662633',
      },
      jobDetail: {
        jobId: 1,
        unitId: 2,
      },
    },
  ]
  const { values, setFieldValue, handleBlur, errors, touched } =
    useFormikContext<VacanciesEditParams>()
  return (
    <>
      <InputLabel className="text-sm font-nunito font-bold text-black mb-1">
        Hiring Manager
      </InputLabel>
      <Autocomplete
        disabled={disabled}
        options={employeesFake}
        renderOption={(props, option) => {
          return (
            <li {...props} key={option.id}>
              <p className="text-sm">
                {option.personalDetail?.firstName}{' '}
                {option.personalDetail?.lastName}
              </p>
            </li>
          )
        }}
        isOptionEqualToValue={(option, value) => option.id === value.id}
        getOptionLabel={(option) =>
          `${option.personalDetail?.firstName} ${option.personalDetail?.lastName}`
        }
        renderInput={(params) => (
          <TextField
            {...params}
            name="hiringManagerId"
            onBlur={handleBlur}
            error={!!errors.hiringManagerId && touched.hiringManagerId}
            InputProps={{
              classes: {
                root: 'h-10 rounded-lg font-nunito bg-white text-sm pt-1',
              },
              ...params.InputProps,
            }}
          />
        )}
        value={employeesFake.find((emp) => emp.id === values?.hiringManagerId)}
        onChange={(_, newValue) =>
          setFieldValue('hiringManagerId', newValue?.id)
        }
      />
      {!!errors.hiringManagerId && touched.hiringManagerId && (
        <p className="text-danger text-sm font-semibold">
          {errors.hiringManagerId}
        </p>
      )}
    </>
  )
}
