import { createFileRoute, Link } from '@tanstack/react-router'
import { Table } from 'flowbite-react'

import {
  createColumnHelper,
} from '@tanstack/react-table'
import Menu from '../model/Menu'

const columnHelper = createColumnHelper<Menu>()

const listMenuColumns = [
  columnHelper.accessor('id', {
    header: () => 'ID',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('name', {
    header: () => 'Name',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('price', {
    header: () => 'Price',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('category', {
    header: () => 'Category',
    cell: (info) => info.row.original.getCategoryName(),
  }),

  columnHelper.display({
    id: 'actions',
    header: () => <span className="sr-only">Actions</span>,
    cell: (info) => (
      <div className="flex space-x-4">
        <Link
          to="/menus/$menuID"
          params={{ menuID: info.row.original.id.toString() }}
          className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
        >
          View
        </Link>
        <Link
          to="/menus/$menuID/edit"
          params={{ menuID: info.row.original.id.toString() }}
          className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
        >
          Edit
        </Link>
      </div>
    ),
  }),
]

export default listMenuColumns