import { useJobParams } from '@frontend/state/job-params'
import { useJobs } from '@frontend/state/job-queries'
import type { VacanciesEditParams } from '@frontend/types/vacancies-info'
import { Autocomplete, InputLabel, TextField } from '@mui/material'
import { useFormikContext } from 'formik'

export const VacanciesJobSelect = ({
  disabled = false,
}: {
  disabled?: boolean
}) => {
  const { jobParams } = useJobParams()
  const { jobs } = useJobs(jobParams)
  const { values, setFieldValue, handleBlur, errors, touched } =
    useFormikContext<VacanciesEditParams>()
  if (!jobs) return null
  return (
    <>
      <InputLabel className="text-sm font-nunito font-bold text-black mb-1">
        Job Title
      </InputLabel>
      <Autocomplete
        disabled={disabled}
        options={jobs}
        renderOption={(props, option) => {
          return (
            <li {...props} key={option.id}>
              <p className="text-sm">{option.title}</p>
            </li>
          )
        }}
        isOptionEqualToValue={(option, value) => option.id === value?.id}
        getOptionLabel={(option) => option.title}
        renderInput={(params) => (
          <TextField
            {...params}
            name="positionId"
            onBlur={handleBlur}
            error={!!errors.positionId && touched.positionId}
            InputProps={{
              classes: {
                root: 'h-10 rounded-lg font-nunito bg-white text-sm pt-1',
              },
              ...params.InputProps,
            }}
          />
        )}
        value={jobs.find((job) => job.id === values?.positionId)}
        onChange={(_, newValue) => setFieldValue('positionId', newValue?.id)}
      />
      {!!errors.positionId && touched.positionId && (
        <p className="text-danger text-sm font-semibold">{errors.positionId}</p>
      )}
    </>
  )
}
