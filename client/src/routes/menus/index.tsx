import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'

import {
  getCoreRowModel,
  getPaginationRowModel,
  PaginationState,
  useReactTable,
} from '@tanstack/react-table'
import { getMenus } from '../../utils/restodb'
import listMenuColumns from '../../tables/listmenu'
import CustomTable from '../../components/CustomTable'
import { useEffect, useState } from 'react'

type Pagination = {
  page: number
  limit: number
}

export const Route = createFileRoute('/menus/')({
  component: RouteComponent,
  validateSearch: (search: Record<string, unknown>): Pagination => {
    // validate and parse the search params into a typed state
    return {
      page: Number(search?.page ?? 1),
      limit: Number(search?.limit ?? 10),
    }
  },
  loaderDeps: ({ search }: { search: Pagination }): Pagination => search,
  loader: async ({ deps }) => {
    const { menus, meta } = await getMenus(deps)
    return {
      menus,
      meta
    }
  },
})

function RouteComponent() {
  const data = Route.useLoaderData()
  const menus = data.menus

  const navigate = useNavigate({ from: Route.fullPath })

  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: data.meta.current - 1,
    pageSize: data.meta.limit,
  })

  const table = useReactTable({
    data: menus,
    columns: listMenuColumns,
    getCoreRowModel: getCoreRowModel(),
    state: {
      pagination,
    },
    onPaginationChange: setPagination,
    manualPagination: true,
    rowCount: data.meta.total
  })

  useEffect(() => {
    navigate({ search: { page: pagination.pageIndex + 1, limit: pagination.pageSize } })
  }, [pagination])

  return (
    <>
      <div className="flex pb-4 justify-between">
        <h1 className="text-xl">Menus</h1>
        <Link
          to="/menus/create"
          className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
        >
          + Create
        </Link>
      </div>
      <CustomTable table={table}>
      </CustomTable>
    </>
  )
}
