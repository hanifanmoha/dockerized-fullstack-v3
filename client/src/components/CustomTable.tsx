import { createFileRoute } from '@tanstack/react-router'
import { Table } from 'flowbite-react'

import {
  flexRender,
  getCoreRowModel,
  Table as TanstackTable,
  useReactTable,
} from '@tanstack/react-table'
import PaginationController from './PaginationController'

interface CustomTable<TData> {
  table: TanstackTable<TData>
}

function CustomTable<TData>({ table }: CustomTable<TData>) {

  return (
    <div className="overflow-x-auto">
      <Table>
        {table.getHeaderGroups().map((headerGroup) => (
          <Table.Head key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <Table.HeadCell key={header.id}>
                {header.isPlaceholder
                  ? null
                  : flexRender(
                    header.column.columnDef.header,
                    header.getContext(),
                  )}
              </Table.HeadCell>
            ))}
          </Table.Head>
        ))}

        <Table.Body className="divide-y">
          {table.getRowModel().rows.map((row) => (
            <Table.Row
              key={row.id}
              className="bg-white dark:border-gray-700 dark:bg-gray-800"
            >
              {row.getVisibleCells().map((cell) => (
                <Table.Cell
                  key={cell.id}
                  className="whitespace-nowrap font-medium text-gray-900 dark:text-white"
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </Table.Cell>
              ))}
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
      <PaginationController currentPage={table.getState().pagination.pageIndex} pageCount={table.getPageCount()} goToPage={table.setPageIndex} goToFirstPage={table.firstPage} goToLastPage={table.lastPage} />
    </div>
  )
}

export default CustomTable