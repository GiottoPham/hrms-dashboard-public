import type { JobDetailInputParams } from '@frontend/types/employee'
import type { JobDetail } from '@frontend/types/job'
import { Autocomplete, InputLabel, TextField } from '@mui/material'
import { useFormikContext } from 'formik'

export const JobTitleSelect = ({
  disabled = false,
}: {
  disabled?: boolean
}) => {
  const jobFake: JobDetail[] = [
    {
      id: 1,
      title: 'Art Director',
      description:
        'Art directors typically oversee the work of other designers and artists who produce images for television, film, live performances, advertisements, or video games. They determine the overall style in which a message is communicated visually to its audience.',
      note: 'abc',
    },
    {
      id: 2,
      title: 'Art Director',
      description:
        'Art directors typically oversee the work of other designers and artists who produce images for television, film, live performances, advertisements, or video games. They determine the overall style in which a message is communicated visually to its audience.',
      note: 'abc',
    },

    {
      id: 3,
      title: 'Art Director',
      description:
        'Art directors typically oversee the work of other designers and artists who produce images for television, film, live performances, advertisements, or video games. They determine the overall style in which a message is communicated visually to its audience.',
      note: 'abc',
    },
    {
      id: 4,
      title: 'Art Director',
      description:
        'Art directors typically oversee the work of other designers and artists who produce images for television, film, live performances, advertisements, or video games. They determine the overall style in which a message is communicated visually to its audience.',
      note: 'abc',
    },
    {
      id: 5,
      title: 'Art Director',
      description:
        'Art directors typically oversee the work of other designers and artists who produce images for television, film, live performances, advertisements, or video games. They determine the overall style in which a message is communicated visually to its audience.',
      note: 'abc',
    },
  ]
  const { values, setFieldValue, handleBlur, errors, touched } =
    useFormikContext<JobDetailInputParams>()
  return (
    <>
      <InputLabel className="text-sm font-nunito font-bold text-black mb-1">
        Job Title
      </InputLabel>
      <Autocomplete
        disabled={disabled}
        options={jobFake}
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
        value={jobFake.find((job) => job.id === values?.jobId)}
        onChange={(_, newValue) => setFieldValue('jobId', newValue?.id)}
      />
      {!!errors.jobId && touched.jobId && (
        <p className="text-danger text-sm font-semibold">{errors.jobId}</p>
      )}
    </>
  )
}
