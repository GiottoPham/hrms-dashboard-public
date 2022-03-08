import cx from 'classnames'
import { isEmpty } from 'lodash'
import { Row, TableOptions, useTable } from 'react-table'

const HEADER_HEIGHT = 48

type TableProps<T extends Record<string, unknown>> = TableOptions<T> & {
  checkedRowIndices?: number[]
  selectedRowIndex?: number
  headerHeight?: number
  rowHeight?: number
  rowCount?: number
  renderRow?: (inputs: { row: Row<T>; rowHeight: number }) => JSX.Element
}

export const Table = <T extends Record<string, unknown>>({
  data,
  columns,
  checkedRowIndices = [],
  selectedRowIndex,
  headerHeight = HEADER_HEIGHT,
  rowHeight = 45,
  rowCount = 12,
  renderRow,
}: TableProps<T>) => {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ data, columns })

  const tableHeight = headerHeight + rowCount * rowHeight + 1

  return (
    <div className="flex flex-col bg-white rounded-lg border border-primary overflow-hidden">
      <div className="align-middle inline-block w-full overflow-x-auto">
        <div
          style={{ minHeight: !isEmpty(rows) ? tableHeight : HEADER_HEIGHT }}
        >
          <table {...getTableProps()} className="w-full table-fixed relative">
            <thead style={{ height: headerHeight }}>
              {headerGroups.map((headerGroup) => (
                // eslint-disable-next-line react/jsx-key
                <tr
                  {...headerGroup.getHeaderGroupProps()}
                  className="sticky top-0 bg-secondary-600 z-10"
                >
                  {headerGroup.headers.map((col) => (
                    // eslint-disable-next-line react/jsx-key
                    <th
                      {...col.getHeaderProps()}
                      scope="col"
                      className={cx(
                        'px-3 text-left text-sm font-inter font-semibold text-primary',
                        col.width
                      )}
                    >
                      {col.render('Header')}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {rows.map((row) => {
                prepareRow(row)
                if (renderRow) {
                  return renderRow({ row, rowHeight })
                }
                return (
                  // eslint-disable-next-line react/jsx-key
                  <tr
                    {...row.getRowProps()}
                    className={cx({
                      'bg-blue-100': checkedRowIndices.includes(row.index),
                      'border-r-4 border-r-primary':
                        selectedRowIndex === row.index,
                      'bg-primary-100': row.index % 2 === 0,
                    })}
                  >
                    {row.cells.map((cell) => (
                      // eslint-disable-next-line react/jsx-key
                      <td
                        {...cell.getCellProps()}
                        style={{ height: rowHeight }}
                        className="px-3 text-sm"
                      >
                        {cell.render('Cell')}
                      </td>
                    ))}
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
