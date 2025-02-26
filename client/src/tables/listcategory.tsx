import { Link } from '@tanstack/react-router'
import {
  createColumnHelper,
} from '@tanstack/react-table'
import Category from '../model/Category'

const columnHelper = createColumnHelper<Category>()

const listCategoryColumns = [
  columnHelper.accessor('id', {
    header: () => 'ID',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('name', {
    header: () => 'Name',
    cell: (info) => info.getValue(),
  }),

  columnHelper.display({
    id: 'actions',
    header: () => <span className="sr-only">Actions</span>,
    cell: (info) => (
      <div className="flex space-x-4">
        <Link
          to="/categories"
          className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
        >
          View
        </Link>
        <Link
          to="/categories"
          className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
        >
          Edit
        </Link>
      </div>
    ),
  }),
]

export default listCategoryColumns