import { useJobParams } from '@frontend/state/job-params'
import { useJobs } from '@frontend/state/job-queries'
import type { JobDetailInputParams } from '@frontend/types/employee'
import { Autocomplete, InputLabel, TextField } from '@mui/material'
import { useFormikContext } from 'formik'

export const JobTitleSelect = ({
  disabled = false,
}: {
  disabled?: boolean
}) => {
  const { jobParams } = useJobParams()
  const { jobs } = useJobs(jobParams)
  const { values, setFieldValue, handleBlur, errors, touched } =
    useFormikContext<JobDetailInputParams>()
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
            name="jobId"
            onBlur={handleBlur}
            error={!!errors.jobId && touched.jobId}
            InputProps={{
              classes: {
                root: 'h-10 rounded-lg font-nunito bg-white text-sm pt-1',
              },
              ...params.InputProps,
            }}
          />
        )}
        value={jobs.find((job) => job.id === values?.jobId)}
        onChange={(_, newValue) => setFieldValue('jobId', newValue?.id)}
      />
      {!!errors.jobId && touched.jobId && (
        <p className="text-danger text-sm font-semibold">{errors.jobId}</p>
      )}
    </>
  )
}
