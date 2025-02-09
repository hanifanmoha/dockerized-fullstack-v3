import { createFileRoute } from '@tanstack/react-router'
import Category from '../../model/Category'
import { Table } from 'flowbite-react'
import { getCategories } from '../../utils/restodb'

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
  const categories = data.categories.map((category) => new Category(category))

  return (
    <div className="overflow-x-auto">
      <Table>
        <Table.Head>
          <Table.HeadCell>ID</Table.HeadCell>
          <Table.HeadCell>Name</Table.HeadCell>
        </Table.Head>

        <Table.Body className="divide-y">
          {categories.map((category) => (
            <Table.Row
              key={category.id}
              className="bg-white dark:border-gray-700 dark:bg-gray-800"
            >
              <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                {category.id}
              </Table.Cell>
              <Table.Cell>{category.name}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  )
}
