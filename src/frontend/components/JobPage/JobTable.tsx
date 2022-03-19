import { Button, IconButton } from '@mui/material'
import type { Column } from 'react-table'
import { Table } from '@frontend/framework/Table'
import EditIcon from '@mui/icons-material/Edit'
import { UpDownIcon } from '@frontend/framework/icons/UpDownIcon'
import AddIcon from '@mui/icons-material/Add'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import { AddJobButton } from './AddJobButton'
import type { JobDetail } from '@frontend/types/job'
import { useJobParams } from '@frontend/state/job-params'
import { useJobs } from '@frontend/state/job-queries'
type CreateHeaderInput = {
  headerText: string
  sortBy: keyof JobDetail
}
const createHeader = ({ headerText, sortBy }: CreateHeaderInput) => {
  const Header = () => {
    const {
      jobParams: { sort },
      setJobParams,
    } = useJobParams()
    return (
      <header className="flex items-center">
        {headerText}
        <IconButton
          classes={{ root: 'p-1 w-8 h-8' }}
          onClick={() => {
            if (sort.sortBy === sortBy) {
              if (sort.sortOrder === 'asc') {
                setJobParams((prev) => ({
                  ...prev!,
                  sort: { ...sort, sortOrder: 'desc' },
                }))
              } else
                setJobParams((prev) => ({
                  ...prev!,
                  sort: { ...sort, sortOrder: 'asc' },
                }))
            } else {
              setJobParams((prev) => ({
                ...prev!,
                sort: { sortBy: sortBy, sortOrder: 'asc' },
              }))
            }
          }}
        >
          {sort?.sortBy !== sortBy && <UpDownIcon />}
          {sort?.sortBy === sortBy && sort.sortOrder === 'asc' && (
            <UpDownIcon isUp={true} />
          )}
          {sort?.sortBy === sortBy && sort.sortOrder === 'desc' && (
            <UpDownIcon isUp={false} />
          )}
        </IconButton>
      </header>
    )
  }

  return Header
}

export const JobTable = () => {
  const { jobParams } = useJobParams()
  const { jobs = [], isLoading } = useJobs(jobParams)

  const columns: Column<JobDetail>[] = [
    {
      Header: createHeader({ headerText: 'Job Title', sortBy: 'title' }),
      accessor: 'title',
      Cell: ({ value }) => <p>{value}</p>,
      width: 'w-[68px]',
    },
    {
      Header: createHeader({
        headerText: 'Job Description',
        sortBy: 'description',
      }),
      accessor: 'description',
      Cell: ({ value }) => <p className="leading-loose p-2">{value}</p>,
      width: 'w-[400px]',
    },

    {
      id: 'actionCell',
      accessor: 'title',
      Cell: ({ row }) => (
        <div className="flex justify-end">
          <AddJobButton
            isEdit={true}
            jobDetail={row.original}
            renderButton={({ openModal }) => (
              <IconButton onClick={openModal}>
                <EditIcon className="w-5 h-5" />
              </IconButton>
            )}
          />
        </div>
      ),
      width: 'w-[50px]',
    },
  ]
  return (
    <div className="rounded px-10 py-5 flex flex-col">
      <AddJobButton
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

      <Table<JobDetail>
        data={jobs}
        columns={columns}
        rowCount={5}
        isLoading={isLoading}
      />
      <div className="self-end mt-5">
        <Button
          classes={{
            root: 'min-w-0 w-10 h-10 bg-white border border-primary',
          }}
          color="inherit"
          variant="outlined"
          // onClick={() => {
          //   if (jobParams.pagination && jobParams.pagination > 1)
          //     setJobParams((prev) => ({
          //       ...prev!,
          //       pagination: jobParams.pagination - 1,
          //     }))
          // }}
        >
          <ChevronLeftIcon className="w-7 h-7 text-primary" />
        </Button>
        <Button
          classes={{
            root: 'min-w-0 w-10 h-10 bg-white border border-primary ml-5',
          }}
          color="inherit"
          variant="outlined"
          // onClick={() => {
          //   if (jobParams.pagination)
          //     setJobParams((prev) => ({
          //       ...prev!,
          //       pagination: jobParams.pagination + 1,
          //     }))
          // }}
        >
          <ChevronRightIcon className="w-7 h-7 text-primary" />
        </Button>
      </div>
    </div>
  )
}
