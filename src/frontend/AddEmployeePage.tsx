import { Layout } from '@components/Layout/Layout'
import { AddEmployeeProgressBar } from '@components/PIMPage/AddEmployeePage/AddEmployeeProgressBar'
import { AssignAccountStep } from '@components/PIMPage/AddEmployeePage/AssignAccountStep'
import { JobDetailsStep } from '@components/PIMPage/AddEmployeePage/JobDetailsStep'
import { PersonalDetailsStep } from '@components/PIMPage/AddEmployeePage/PersonalDetailsStep'
import { AuthGuard } from '@frontend/framework/AuthGuard'
import { useAddEmployeeForm } from '@frontend/state/add-employee-form'

export const AddEmployeePage = () => {
  const { addStep, setAddStep } = useAddEmployeeForm()
  return (
    <AuthGuard>
      <Layout
        renderHeader={() => (
          <h1 className="font-bold text-2xl uppercase">Add Employee</h1>
        )}
      >
        <div className="py-5">
          <div className="w-full">
            <AddEmployeeProgressBar step={addStep} />
          </div>

          <div className="py-2 flex flex-col items-center">
            {addStep === 0 && (
              <PersonalDetailsStep goNext={() => setAddStep(addStep + 1)} />
            )}
            {addStep === 1 && (
              <JobDetailsStep
                goBack={() => setAddStep(addStep - 1)}
                goNext={() => setAddStep(addStep + 1)}
              />
            )}
            {addStep === 2 && (
              <AssignAccountStep
                goBack={() => setAddStep(addStep - 1)}
                goReset={() => setAddStep(0)}
              />
            )}
          </div>
        </div>
      </Layout>
    </AuthGuard>
  )
}
