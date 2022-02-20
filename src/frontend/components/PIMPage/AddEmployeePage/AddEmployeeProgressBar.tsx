import {
  Stepper,
  Step,
  StepLabel,
  StepConnector,
  StepIcon,
} from '@mui/material'
import CheckIcon from '@mui/icons-material/Check'

const ADD_EMPLOYEE_PROGRESS_LABELS = [
  'Personal Detail',
  'Job Details',
  'Assign Account',
]

export const AddEmployeeProgressBar = ({ step = 0 }: { step?: number }) => {
  return (
    <Stepper
      activeStep={step}
      alternativeLabel={true}
      connector={
        <StepConnector
          classes={{
            root: 'border-t-2 mt-2',
            completed: 'border-primary',
            active: 'border-primary',
            line: 'border-0',
            disabled: 'border-gray-400',
          }}
        />
      }
    >
      {ADD_EMPLOYEE_PROGRESS_LABELS.map((label, index) => (
        <Step key={label}>
          <StepLabel
            classes={{
              label: 'font-semibold font-nunito',
              active: 'text-primary',
              completed: 'text-secondary-600',
              disabled: 'text-gray-500',
            }}
            StepIconComponent={() => (
              <StepIcon
                icon={
                  index < step ? (
                    <div className="bg-secondary-600 rounded-full w-10 h-10 flex items-center justify-center -mb-2">
                      <CheckIcon className="w-6 h-6 text-primary" />
                    </div>
                  ) : index === step ? (
                    <div className="rounded-full w-10 h-10 flex items-center justify-center bg-primary -mb-2">
                      <p className="text-white font-semibold text-lg">
                        {index + 1}
                      </p>
                    </div>
                  ) : (
                    <div className="rounded-full w-10 h-10 flex items-center justify-center border-2 border-gray-500 bg-white -mb-2">
                      <p className="text-gray-500 font-semibold text-lg">
                        {index + 1}
                      </p>
                    </div>
                  )
                }
              />
            )}
          >
            {label}
          </StepLabel>
        </Step>
      ))}
    </Stepper>
  )
}
