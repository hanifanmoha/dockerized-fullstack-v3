import { createFileRoute, Link } from '@tanstack/react-router'
import { Table } from 'flowbite-react'

import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { getMenus } from '../../utils/restodb'
import listMenuColumns from '../../tables/listmenu'
import CustomTable from '../../components/CustomTable'

export const Route = createFileRoute('/menus/')({
  component: RouteComponent,
  loader: async () => {
    return {
      menus: await getMenus(),
    }
  },
})

function RouteComponent() {
  const data = Route.useLoaderData()
  const menus = data.menus

  const table = useReactTable({
    data: menus,
    columns: listMenuColumns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <div>
      <div className="flex pb-4 justify-between">
        <h1 className="text-xl">Menus</h1>
        <Link
          to="/menus/create"
          className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
        >
          + Create
        </Link>
      </div>
      <CustomTable table={table} />
    </div>
  )
}
