import { createFileRoute, Link } from '@tanstack/react-router'
import Category from '../../model/Category'
import { Table } from 'flowbite-react'
import { getCategories } from '../../utils/restodb'
import listCategoryColumns from '../../tables/listcategory'
import { getCoreRowModel, useReactTable } from '@tanstack/react-table'
import CustomTable from '../../components/CustomTable'

export const Route = createFileRoute('/categories/')({
  component: CategoryComponent,
  loader: async () => {
    return {
      categories: await getCategories(),
    }
  },
})

function CategoryComponent() {
  const data = Route.useLoaderData() as { categories: Category[] }
  const categories = data.categories

  const table = useReactTable({
    data: categories,
    columns: listCategoryColumns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <>
      <div className="flex pb-4 justify-between">
        <h1 className="text-xl">Categories</h1>
        <Link
          to="/categories/create"
          className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
        >
          + Create
        </Link>
      </div>
      <CustomTable table={table} />
    </>
  )
}
