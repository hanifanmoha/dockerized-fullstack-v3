import { createFileRoute, Link } from '@tanstack/react-router'
import { Table } from 'flowbite-react'

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'
import Menu from '../../model/Menu'
import { getMenus } from '../../utils/restodb'

export const Route = createFileRoute('/menus/outdex')({
  component: RouteComponent,
  loader: async () => {
    return {
      menus: await getMenus()
    }
  }
})

const columnHelper = createColumnHelper<Menu>()

const columns = [
  columnHelper.accessor('id', {
    header: () => 'ID',
    cell: info => info.getValue(),
  }),
  columnHelper.accessor('name', {
    header: () => 'Name',
    cell: info => info.getValue(),
  }),
  columnHelper.accessor('price', {
    header: () => 'Price',
    cell: info => info.getValue(),
  }),
  columnHelper.accessor('category', {
    header: () => 'Category',
    cell: info => info.row.original.getCategoryName(),
  }),

  columnHelper.display({
    id: 'actions',
    header: () => <span className='sr-only'>Actions</span>,
    cell: info => (
      <div className='flex space-x-4'>
        <Link to="/menus/$menuID" params={{ menuID: info.row.original.id.toString() }} className='font-medium text-cyan-600 hover:underline dark:text-cyan-500'>
          View
        </Link>
        <Link to="/menus/$menuID/edit" params={{ menuID: info.row.original.id.toString() }} className='font-medium text-cyan-600 hover:underline dark:text-cyan-500'>
          Edit
        </Link>
      </div>
    ),
  }),
]

function RouteComponent() {
  const data = Route.useLoaderData()
  const menus = data.menus

  const table = useReactTable({
    data: menus,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <div className='overflow-x-auto'>
      <Table>
        {table.getHeaderGroups().map(headerGroup => (
          <Table.Head key={headerGroup.id}>
            {headerGroup.headers.map(header => (
              <Table.HeadCell key={header.id}>
                {header.isPlaceholder
                  ? null
                  : flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
              </Table.HeadCell>
            ))}
          </Table.Head>
        ))}

        <Table.Body className="divide-y">
          {table.getRowModel().rows.map(row => (
            <Table.Row key={row.id} className='bg-white dark:border-gray-700 dark:bg-gray-800'>
              {row.getVisibleCells().map(cell => (
                <Table.Cell key={cell.id} className='whitespace-nowrap font-medium text-gray-900 dark:text-white'>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </Table.Cell>
              ))}
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  )
}
