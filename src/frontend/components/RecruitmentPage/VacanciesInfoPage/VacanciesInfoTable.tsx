import { Button, IconButton } from '@mui/material'
import type { Column } from 'react-table'
import { Table } from '@frontend/framework/Table'
import { UpDownIcon } from '@frontend/framework/icons/UpDownIcon'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import { formatDate } from '@frontend/framework/utils/date'
import type { VacanciesInfo } from '@frontend/types/vacancies-info'
import { VacanciesStatus } from '@components/RecruitmentPage/VacanciesInfoPage/VacanciesStatus'
import { CandidateVacanciesButton } from '@components/RecruitmentPage/VacanciesInfoPage/CandidateVacanciesButton'
import { RecruitmentIcon } from '@frontend/framework/icons/RecruitmentIcon'
import { EditVacanciesButton } from '@components/RecruitmentPage/VacanciesInfoPage/EditVacanciesButton'
import EditIcon from '@mui/icons-material/Edit'
import AddIcon from '@mui/icons-material/Add'
import { useVacancies } from '@frontend/state/vacancies-queries'
import { useEmployeeParams } from '@frontend/state/employee-params'
import { useEmployees } from '@frontend/state/employee-queries'
import { useJobParams } from '@frontend/state/job-params'
import { useJobs } from '@frontend/state/job-queries'
import { useUnits } from '@frontend/state/unit-queries'
import { useVacanciesParams } from '@frontend/state/vacancies-params'

type CreateHeaderInput = {
  headerText: string
  sortBy?: keyof VacanciesInfo
}
const createHeader = ({ headerText, sortBy }: CreateHeaderInput) => {
  const Header = () => {
    const {
      vacanciesParams: { sortBy: sortByParams, sortOrder },
      setVacanciesParams,
    } = useVacanciesParams()
    return (
      <header className="flex items-center">
        {headerText}
        <IconButton
          classes={{ root: 'p-1 w-8 h-8' }}
          onClick={() => {
            if (sortByParams === sortBy) {
              if (sortOrder === 'asc')
                setVacanciesParams((prev) => ({ ...prev!, sortOrder: 'desc' }))
              else
                setVacanciesParams((prev) => ({ ...prev!, sortOrder: 'asc' }))
            } else {
              setVacanciesParams((prev) => ({
                ...prev!,
                sortBy: sortBy || 'id',
                sortOrder: 'desc',
              }))
            }
          }}
        >
          {sortBy !== sortByParams && <UpDownIcon />}
          {sortBy === sortByParams && sortOrder === 'asc' && (
            <UpDownIcon isUp={true} />
          )}
          {sortBy === sortByParams && sortOrder === 'desc' && (
            <UpDownIcon isUp={false} />
          )}
        </IconButton>
      </header>
    )
  }

  return Header
}

export const VacanciesInfoTable = () => {
  const { employeeParams } = useEmployeeParams()
  const { employees = [], isLoading: employeeLoading } =
    useEmployees(employeeParams)
  const { jobParams } = useJobParams()
  const { jobs = [], isLoading: jobLoading } = useJobs(jobParams)
  const { units = [], isLoading: unitLoading } = useUnits(false)
  const { vacanciesParams, setVacanciesParams } = useVacanciesParams()
  const { vacancies: vacanciesList, isLoading } = useVacancies(vacanciesParams)
  const vacancies = vacanciesList?.vacanciesInfos || []
  const columns: Column<VacanciesInfo>[] = [
    {
      accessor: 'id',
      Header: createHeader({
        headerText: 'Id',
        sortBy: 'id',
      }),
      Cell: ({ value }) => <p className="leading-loose">{value}</p>,
      width: 'w-[50px]',
    },
    {
      Header: createHeader({
        headerText: 'Hiring Manager',
        sortBy: 'hiringManagerId',
      }),
      accessor: 'hiringManagerId',
      Cell: ({ value }) => (
        <p className="leading-loose truncate">
          {
            employees.find((emp) => emp?.id === value)?.personalDetail
              ?.firstName
          }{' '}
          {employees.find((emp) => emp?.id === value)?.personalDetail?.lastName}
        </p>
      ),
      width: 'w-[150px]',
    },
    {
      id: 'JobCell',
      Header: createHeader({
        headerText: 'Job Title',
        sortBy: 'positionId',
      }),
      accessor: 'positionId',
      Cell: ({ value }) => (
        <p className="leading-loose truncate">
          {jobs.find((job) => job.id === value)?.title}
        </p>
      ),
      width: 'w-[150px]',
    },
    {
      id: 'UnitCell',
      Header: createHeader({
        headerText: 'Unit',
        sortBy: 'departmentId',
      }),
      accessor: 'departmentId',
      Cell: ({ value }) => (
        <p className="leading-loose truncate">
          {units.find((unit) => unit.id === value)?.name}
        </p>
      ),
      width: 'w-[120px]',
    },
    {
      id: 'ExpiredDateCell',
      Header: createHeader({
        headerText: 'Expired Date',
        sortBy: 'expiredDate',
      }),
      accessor: 'expiredDate',
      Cell: ({ value }) => (
        <p className="leading-loose">{formatDate(value, 'MM/dd/yyyy')}</p>
      ),
      width: 'w-[150px]',
    },
    {
      id: 'PublishedDateCell',
      Header: createHeader({
        headerText: 'Published Date',
        sortBy: 'publishedDate',
      }),
      accessor: 'publishedDate',
      Cell: ({ value }) => (
        <p className="leading-loose">{formatDate(value, 'MM/dd/yyyy')}</p>
      ),
      width: 'w-[120px]',
    },
    {
      id: 'Quantity',
      Header: createHeader({
        headerText: 'Quantity',
        sortBy: 'quantity',
      }),
      accessor: 'quantity',
      Cell: ({ value }) => <p className="leading-loose p-2">{value}</p>,
      width: 'w-[100px]',
    },
    {
      id: 'status',
      Header: createHeader({
        headerText: 'Status',
        sortBy: 'status',
      }),
      accessor: 'status',
      Cell: VacanciesStatus,
      width: 'w-[80px]',
    },
    {
      id: 'action',
      Header: <header>Action</header>,
      accessor: 'id',
      Cell: ({ value, row }) => (
        <div className="flex">
          <CandidateVacanciesButton
            id={value}
            renderButton={({ openModal }) => (
              <IconButton onClick={openModal}>
                <RecruitmentIcon className="w-5 h-5" />
              </IconButton>
            )}
          />
          <EditVacanciesButton
            isEdit={true}
            vacanciesInfo={row.original}
            renderButton={({ openModal }) => (
              <IconButton onClick={openModal}>
                <EditIcon className="w-5 h-5" />
              </IconButton>
            )}
          />
        </div>
      ),
      width: 'w-[100px]',
    },
  ]

  return (
    <div className="rounded px-10 py-5 flex flex-col">
      <EditVacanciesButton
        renderButton={({ openModal }) => (
          <Button
            classes={{
              root: 'min-w-0 w-10 h-10 bg-white border-2 border-primary rounded-full self-end -mb-5 z-20 mr-5',
            }}
            color="inherit"
            variant="outlined"
            onClick={openModal}
          >
            <AddIcon className="w-5 h-5 text-primary" />
          </Button>
        )}
      />
      <Table<VacanciesInfo>
        data={vacancies}
        columns={columns}
        rowCount={5}
        isLoading={isLoading || employeeLoading || unitLoading || jobLoading}
      />
      <div className="self-end mt-5">
        <Button
          classes={{
            root: 'min-w-0 w-10 h-10 bg-white border border-primary hover:bg-gray-100',
            disabled: 'bg-gray-200',
          }}
          color="inherit"
          variant="outlined"
          disabled={vacanciesList?.first}
          onClick={() =>
            setVacanciesParams((prev) => ({
              ...prev!,
              pagination: vacanciesParams.pagination - 1,
            }))
          }
        >
          <ChevronLeftIcon className="w-7 h-7 text-primary" />
        </Button>
        <Button
          classes={{
            root: 'min-w-0 w-10 h-10 bg-white border border-primary ml-5 hover:bg-gray-100',
            disabled: 'bg-gray-200',
          }}
          variant="outlined"
          disabled={vacanciesList?.last}
          onClick={() =>
            setVacanciesParams((prev) => ({
              ...prev!,
              pagination: vacanciesParams.pagination + 1,
            }))
          }
        >
          <ChevronRightIcon className="w-7 h-7 text-primary" />
        </Button>
      </div>
    </div>
  )
}
