import { createFileRoute } from '@tanstack/react-router'
import Category from '../model/Category'
import { Table } from 'flowbite-react'

const hardcodedCategories = [
  { id: 1, name: 'Main Course' },
  { id: 2, name: 'Beverage' },
  { id: 3, name: 'Dessert' }
]

export const Route = createFileRoute('/categories')({
  component: AboutComponent,
  loader: async () => {
    return {
      categories: hardcodedCategories.map(category => Category.fromJson(category))
    }
  }
})

function AboutComponent() {
  const { categories } = Route.useLoaderData() as { categories: Category[] }

  return (
    <div className="overflow-x-auto">
      <Table>
        <Table.Head>
          <Table.HeadCell>ID</Table.HeadCell>
          <Table.HeadCell>Name</Table.HeadCell>
        </Table.Head>

        <Table.Body className="divide-y">
          {categories.map(category => (
            <Table.Row key={category.id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
              <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">{category.id}</Table.Cell>
              <Table.Cell>{category.name}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  )
}
