import { Button, CircularProgress, IconButton, InputLabel } from '@mui/material'
import type { Column } from 'react-table'
import { Table } from '@frontend/framework/Table'
import { UpDownIcon } from '@frontend/framework/icons/UpDownIcon'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import { formatDate } from '@frontend/framework/utils/date'
import type { Candidate } from '@frontend/types/candidate'
import { useCandidates } from '@frontend/state/candidate-queries'
import { useCandidateParams } from '@frontend/state/candidate-params'
import LinkIcon from '@mui/icons-material/Link'
import { formatPhoneNumberIntl } from 'react-phone-number-input'
import {
  usePromoteCandidate,
  useRejectCandidate,
} from '@frontend/state/candidate-mutation'
import { Fragment, useState } from 'react'
import { TextInput } from '@frontend/framework/TextInput'
import { SearchOutlined } from '@mui/icons-material'

type CreateHeaderInput = {
  headerText: string
  sortBy?: keyof Candidate
}
const createHeader = ({ headerText, sortBy }: CreateHeaderInput) => {
  const Header = () => {
    const {
      candidateParams: { sortBy: sortByParams, sortOrder },
      setCandidateParams,
    } = useCandidateParams()
    return (
      <header className="flex items-center">
        {headerText}
        {sortBy && (
          <IconButton
            classes={{ root: 'p-1 w-8 h-8' }}
            onClick={() => {
              if (sortByParams === sortBy) {
                if (sortOrder === 'asc')
                  setCandidateParams((prev) => ({
                    ...prev!,
                    sortOrder: 'desc',
                  }))
                else
                  setCandidateParams((prev) => ({ ...prev!, sortOrder: 'asc' }))
              } else {
                setCandidateParams((prev) => ({
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
        )}
      </header>
    )
  }

  return Header
}

export const CandidatesTable = ({ vacanciesId }: { vacanciesId?: number }) => {
  const { candidateParams, setCandidateParams } = useCandidateParams()
  const { candidates: candidateList, isLoading } = useCandidates({
    ...candidateParams,
    jobRecruitmentId: vacanciesId,
  })
  const candidates = candidateList?.candidates || []
  const { promoteCandidate, isLoading: promoteLoading } = usePromoteCandidate()
  const { rejectCandidate, isLoading: rejectLoading } = useRejectCandidate()
  const [promoteId, setPromoteId] = useState<number>()
  const [rejectId, setRejectId] = useState<number>()
  const [canName, setCanName] = useState('')
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
      Cell: ({ value }) => <p className="leading-loose truncate">{value}</p>,
      width: 'w-[100px]',
    },
    {
      id: 'JobCell',
      Header: createHeader({
        headerText: 'Job Title',
        sortBy: 'jobTitle',
      }),
      accessor: 'jobTitle',
      Cell: ({ value }) => <p className="leading-loose truncate">{value}</p>,
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
      Cell: ({ value }) => <p className="leading-loose truncate">{value}</p>,
      width: 'w-[150px]',
    },
    {
      id: 'contact',
      Header: createHeader({
        headerText: 'Contact',
        sortBy: 'contact',
      }),
      accessor: 'contact',
      Cell: ({ value }) => (
        <p className="leading-loose">
          {value ? formatPhoneNumberIntl(value) || '--' : '--'}
        </p>
      ),
      width: 'w-[100px]',
    },
    {
      id: 'url',
      Header: createHeader({
        headerText: 'CV',
        sortBy: 'url',
      }),
      accessor: 'url',
      Cell: ({ value, row }) =>
        value ? (
          <a
            href={value}
            download={`CV of ${row.original.name}`}
            target="_blank"
            rel="noreferrer"
          >
            <IconButton className="leading-loose">
              <LinkIcon className="w-6 h-6" />
            </IconButton>
          </a>
        ) : (
          <p>No Link</p>
        ),
      width: 'w-[50px]',
    },
    {
      id: 'promote',
      Header: createHeader({
        headerText: 'Promote',
      }),
      accessor: 'id',
      Cell: ({ value }) => (
        <Button
          onClick={() => {
            setPromoteId(value)
            promoteCandidate(value)
          }}
          variant="outlined"
          className="text-sm rounded-full font-nunito normal-case font-bold shadow-none mr-5 bg-white border-2 -ml-2"
        >
          {promoteLoading && promoteId === value && (
            <CircularProgress
              color="primary"
              size={20}
              thickness={5}
              className="mr-2"
            />
          )}
          Promote
        </Button>
      ),
      width: 'w-[80px]',
    },
    {
      id: 'reject',
      Header: createHeader({
        headerText: 'Reject',
      }),
      accessor: 'id',
      Cell: ({ value }) => (
        <Button
          onClick={() => {
            setRejectId(value)
            rejectCandidate(value)
          }}
          variant="outlined"
          className="text-sm rounded-full font-nunito normal-case font-bold shadow-none mr-5 bg-white border-2 -ml-2"
          color="error"
        >
          {rejectLoading && rejectId === value && (
            <CircularProgress
              color="error"
              size={20}
              thickness={5}
              className="mr-2"
            />
          )}
          Reject
        </Button>
      ),
      width: 'w-[80px]',
    },
  ]
  const columnsWithId: Column<Candidate>[] = [
    {
      Header: createHeader({
        headerText: 'Candidate Name',
        sortBy: 'name',
      }),
      accessor: 'name',
      Cell: ({ value }) => <p className="leading-loose truncate">{value}</p>,
      width: 'w-[60px]',
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
      width: 'w-[50px]',
    },
    {
      id: 'Email',
      Header: createHeader({
        headerText: 'Email',
        sortBy: 'email',
      }),
      accessor: 'email',
      Cell: ({ value }) => <p className="leading-loose truncate">{value}</p>,
      width: 'w-[120px]',
    },
    {
      id: 'contact',
      Header: createHeader({
        headerText: 'Contact',
        sortBy: 'contact',
      }),
      accessor: 'contact',
      Cell: ({ value }) => (
        <p className="leading-loose">
          {' '}
          {value ? formatPhoneNumberIntl(value) || '--' : '--'}
        </p>
      ),
      width: 'w-[50px]',
    },
    {
      id: 'url',
      Header: createHeader({
        headerText: 'CV',
        sortBy: 'url',
      }),
      accessor: 'url',
      Cell: ({ value, row }) =>
        value ? (
          <a
            href={value}
            download={`CV of ${row.original.name}`}
            target="_blank"
            rel="noreferrer"
          >
            <IconButton className="leading-loose">
              <LinkIcon className="w-6 h-6" />
            </IconButton>
          </a>
        ) : (
          <p>No Link</p>
        ),
      width: 'w-[50px]',
    },
  ]
  return (
    <div className="rounded px-10 py-5 flex flex-col">
      {!vacanciesId && (
        <Fragment>
          <InputLabel className="text-sm font-nunito font-bold text-black mb-1">
            Search Candidate
          </InputLabel>
          <TextInput
            id="canName"
            variant="outlined"
            placeholder="Employee name, email or contact"
            InputProps={{
              classes: {
                root: 'h-10 rounded-lg font-nunito bg-white text-sm w-1/4 mb-5',
              },
              startAdornment: <SearchOutlined className="mr-2 text-gray-500" />,
            }}
            value={canName}
            onChange={(e) => setCanName(e.target.value)}
          />
        </Fragment>
      )}
      <Table<Candidate>
        data={candidates.filter((can) =>
          (can.name + ' ' + can.email + ' ' + can.contact)
            .toLowerCase()
            .includes(canName.toLowerCase())
        )}
        columns={vacanciesId ? columnsWithId : columns}
        rowCount={5}
        isLoading={isLoading}
      />
      {!vacanciesId && (
        <div className="self-end mt-5">
          <Button
            classes={{
              root: 'min-w-0 w-10 h-10 bg-white border border-primary hover:bg-gray-100',
              disabled: 'bg-gray-200',
            }}
            color="inherit"
            variant="outlined"
            disabled={candidateList?.first}
            onClick={() =>
              setCandidateParams((prev) => ({
                ...prev!,
                pagination: candidateParams.pagination - 1,
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
            disabled={candidateList?.last}
            onClick={() =>
              setCandidateParams((prev) => ({
                ...prev!,
                pagination: candidateParams.pagination + 1,
              }))
            }
          >
            <ChevronRightIcon className="w-7 h-7 text-primary" />
          </Button>
        </div>
      )}
    </div>
  )
}
