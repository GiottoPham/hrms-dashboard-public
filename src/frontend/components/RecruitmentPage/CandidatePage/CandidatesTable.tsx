import { Button, IconButton } from '@mui/material'
import type { Column } from 'react-table'
import { Table } from '@frontend/framework/Table'
import { UpDownIcon } from '@frontend/framework/icons/UpDownIcon'
import { useState } from 'react'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import { formatDate } from '@frontend/framework/utils/date'
import type { Candidate } from '@frontend/types/candidate'
import { useCandidates } from '@frontend/state/candidate-queries'
type CreateHeaderInput = {
  headerText: string
  sortBy?: keyof Candidate
}
const createHeader = ({ headerText, sortBy }: CreateHeaderInput) => {
  const Header = () => {
    const [sort, setSort] = useState({
      sortBy: 'id',
      sortOrder: 'asc',
    })

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

export const CandidatesTable = ({ vacanciesId }: { vacanciesId?: number }) => {
  const { candidates = [], isLoading } = useCandidates({
    vacanciesId: vacanciesId,
  })
  const columns: Column<Candidate>[] = [
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
        headerText: 'Candidate Name',
        sortBy: 'name',
      }),
      accessor: 'name',
      Cell: ({ value }) => <p className="leading-loose">{value}</p>,
      width: 'w-[100px]',
    },
    {
      id: 'JobCell',
      Header: createHeader({
        headerText: 'Job Title',
        sortBy: 'jobTitle',
      }),
      accessor: 'jobTitle',
      Cell: ({ value }) => <p className="leading-loose">{value}</p>,
      width: 'w-[100px]',
    },
    {
      id: 'ApllyDateCell',
      Header: createHeader({
        headerText: 'Date Applied',
        sortBy: 'appliedDate',
      }),
      accessor: 'appliedDate',
      Cell: ({ value }) => (
        <p className="leading-loose">{formatDate(value, 'MM/dd/yyyy')}</p>
      ),
      width: 'w-[100px]',
    },
    {
      id: 'Email',
      Header: createHeader({
        headerText: 'Email',
        sortBy: 'email',
      }),
      accessor: 'email',
      Cell: ({ value }) => <p className="leading-loose">{value}</p>,
      width: 'w-[150px]',
    },
    {
      id: 'contact',
      Header: createHeader({
        headerText: 'Contact',
        sortBy: 'contact',
      }),
      accessor: 'contact',
      Cell: ({ value }) => <p className="leading-loose">{value}</p>,
      width: 'w-[100px]',
    },
  ]
  const columnsWithId: Column<Candidate>[] = [
    {
      Header: createHeader({
        headerText: 'Candidate Name',
        sortBy: 'name',
      }),
      accessor: 'name',
      Cell: ({ value }) => <p className="leading-loose">{value}</p>,
      width: 'w-[80px]',
    },

    {
      id: 'ApllyDateCell',
      Header: createHeader({
        headerText: 'Date Applied',
        sortBy: 'appliedDate',
      }),
      accessor: 'appliedDate',
      Cell: ({ value }) => (
        <p className="leading-loose">{formatDate(value, 'MM/dd/yyyy')}</p>
      ),
      width: 'w-[80px]',
    },
    {
      id: 'Email',
      Header: createHeader({
        headerText: 'Email',
        sortBy: 'email',
      }),
      accessor: 'email',
      Cell: ({ value }) => <p className="leading-loose">{value}</p>,
      width: 'w-[80px]',
    },
    {
      id: 'contact',
      Header: createHeader({
        headerText: 'Contact',
        sortBy: 'contact',
      }),
      accessor: 'contact',
      Cell: ({ value }) => <p className="leading-loose">{value}</p>,
      width: 'w-[80px]',
    },
  ]
  return (
    <div className="rounded px-10 py-5 flex flex-col">
      <Table<Candidate>
        data={candidates}
        columns={vacanciesId ? columnsWithId : columns}
        rowCount={5}
        isLoading={isLoading}
      />
      {!vacanciesId && (
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
      )}
    </div>
  )
}
