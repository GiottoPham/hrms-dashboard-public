import {
  ButtonWithModal,
  RenderButtonFn,
} from '@frontend/framework/ButtonWithModal'
import { Tab, Tabs } from '@mui/material'
import { useState } from 'react'
import cx from 'classnames'
import { EditBasicInfo } from '@components/PIMPage/EmployeesInfoPage/EditBasicInfo'
import { EditJobSalaryInfo } from '@components/PIMPage/EmployeesInfoPage/EditJobSalaryInfo'
import { EditInsuranceInfo } from '@components/PIMPage/EmployeesInfoPage/EditInsuranceInfo'
export const EditEmployeeButton = ({
  renderButton,
}: {
  employeeId: number
  renderButton: RenderButtonFn
}) => {
  const employee_tab = [
    {
      label: 'BASIC INFO',
      path: 'basic_info',
    },
    {
      label: 'INSURANCE',
      path: 'insurance',
    },
    {
      label: 'JOB/SALARY',
      path: 'job_salary',
    },
  ]
  const [emPath, setEmPath] = useState('basic_info')
  return (
    <ButtonWithModal
      renderButton={renderButton}
      renderModal={({ Modal, isOpen, closeModal }) => (
        <Modal
          open={isOpen}
          onClose={() => {
            closeModal()
          }}
          closeAfterTransition
          disableScrollLock
          onBackdropClick={(e) => {
            e.stopPropagation()
          }}
        >
          <div className="flex flex-col font-nunito bg-white h-full w-full px-8 py-6 md:w-8/12 lg:w-7/12 xl:w-6/12 md:h-5/6 md:absolute md:top-1/2 md:left-1/2 md:transform md:-translate-x-1/2 md:-translate-y-1/2 md:rounded-xl md:overflow-y-auto">
            <div className="border-b border-gray-500 text-gray-500 text-xl">
              Edit Employee Info
            </div>
            <Tabs
              scrollButtons={false}
              value={emPath}
              indicatorColor="primary"
              textColor="inherit"
              onChange={(_, value) => {
                setEmPath(value)
              }}
              aria-label="navigation tabs"
              variant="scrollable"
            >
              {employee_tab.map(({ label, path }) => (
                <Tab
                  key={label}
                  label={
                    <div className="flex justify-between items-center">
                      <p>{label}</p>
                    </div>
                  }
                  value={path}
                  classes={{
                    root: cx(
                      'text-sm normal-case font-nunito px-0 min-w-min font-semibold w-1/3',
                      {
                        'text-primary': emPath === path,
                        'text-blue-500': emPath !== path,
                      }
                    ),
                  }}
                />
              ))}
            </Tabs>
            {emPath === 'basic_info' && <EditBasicInfo />}
            {emPath === 'job_salary' && <EditJobSalaryInfo />}
            {emPath === 'insurance' && <EditInsuranceInfo />}
          </div>
        </Modal>
      )}
    ></ButtonWithModal>
  )
}
