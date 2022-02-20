import { Button, IconButton } from '@mui/material'
import type { Column } from 'react-table'
import { Table } from '@frontend/framework/Table'
import EditIcon from '@mui/icons-material/Edit'
import { UpDownIcon } from '@frontend/framework/icons/UpDownIcon'
import { useState } from 'react'
import AddIcon from '@mui/icons-material/Add'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import { AddJobButton } from './AddJobButton'
import type { JobDetail } from '@frontend/types/job'
type CreateHeaderInput = {
  headerText: string
  sortBy: 'title' | 'description'
}
const createHeader = ({ headerText, sortBy }: CreateHeaderInput) => {
  const Header = () => {
    const [sort, setSort] = useState({ sortBy: 'title', sortOrder: 'asc' })

    return (
      <header className="flex items-center">
        {headerText}
        <IconButton
          classes={{ root: 'p-1 w-8 h-8' }}
          onClick={() => {
            if (sort.sortOrder === 'asc')
              setSort((prev) => ({ ...prev, sortOrder: 'desc' }))
            else setSort((prev) => ({ ...prev, sortOrder: 'asc' }))
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
    Cell: () => (
      <div className="flex justify-end">
        <IconButton>
          <EditIcon className="w-5 h-5" />
        </IconButton>
      </div>
    ),
    width: 'w-[50px]',
  },
]
const jobFake: JobDetail[] = [
  {
    id: 1,
    title: 'Art Director',
    description:
      'Art directors typically oversee the work of other designers and artists who produce images for television, film, live performances, advertisements, or video games. They determine the overall style in which a message is communicated visually to its audience.',
  },
  {
    id: 2,
    title: 'Art Director',
    description:
      'Art directors typically oversee the work of other designers and artists who produce images for television, film, live performances, advertisements, or video games. They determine the overall style in which a message is communicated visually to its audience.',
  },
  {
    id: 3,
    title: 'Art Director',
    description:
      'Art directors typically oversee the work of other designers and artists who produce images for television, film, live performances, advertisements, or video games. They determine the overall style in which a message is communicated visually to its audience.',
  },
  {
    id: 4,
    title: 'Art Director',
    description:
      'Art directors typically oversee the work of other designers and artists who produce images for television, film, live performances, advertisements, or video games. They determine the overall style in which a message is communicated visually to its audience.',
  },
  {
    id: 5,
    title: 'Art Director',
    description:
      'Art directors typically oversee the work of other designers and artists who produce images for television, film, live performances, advertisements, or video games. They determine the overall style in which a message is communicated visually to its audience.',
  },
]
export const JobTable = () => {
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

      <Table<JobDetail> data={jobFake} columns={columns} rowCount={5} />
      <div className="self-end mt-5">
        <Button
          classes={{
            root: 'min-w-0 w-10 h-10 bg-white border border-primary',
          }}
          color="inherit"
          variant="outlined"
        >
          <ChevronLeftIcon className="w-7 h-7 text-primary" />
        </Button>
        <Button
          classes={{
            root: 'min-w-0 w-10 h-10 bg-white border border-primary ml-5',
          }}
          color="inherit"
          variant="outlined"
        >
          <ChevronRightIcon className="w-7 h-7 text-primary" />
        </Button>
      </div>
    </div>
  )
}
