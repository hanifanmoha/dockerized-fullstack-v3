import { createFileRoute, Link } from '@tanstack/react-router'
import { getMenus } from '../../utils/restodb'
import { Table } from 'flowbite-react'

export const Route = createFileRoute('/menus/')({
  component: RouteComponent,
  loader: async () => {
    return {
      menus: await getMenus()
    }
  }
})

function RouteComponent() {

  const data = Route.useLoaderData()
  const menus = data.menus

  return (
    <div className="overflow-x-auto">
      <div className="flex justify-start space-x-4">
        <Link to="/menus/create" className='font-medium text-cyan-600 hover:underline dark:text-cyan-500'>
          Create
        </Link>
      </div>
      <Table>
        <Table.Head>
          <Table.HeadCell>ID</Table.HeadCell>
          <Table.HeadCell>Name</Table.HeadCell>
          <Table.HeadCell>Price</Table.HeadCell>
          <Table.HeadCell>Category</Table.HeadCell>
          <Table.HeadCell>
            <span className="sr-only">Edit</span>
          </Table.HeadCell>
        </Table.Head>

        <Table.Body className="divide-y">
          {menus.map(menu => (
            <Table.Row key={menu.id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
              <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                {menu.id}
              </Table.Cell>
              <Table.Cell>{menu.name}</Table.Cell>
              <Table.Cell>{menu.price}</Table.Cell>
              <Table.Cell>{menu.getCategoryName()}</Table.Cell>
              <Table.Cell>
                <div className="flex space-x-4">
                  <Link to="/menus/$menuID" params={{ menuID: menu.id.toString() }} className='font-medium text-cyan-600 hover:underline dark:text-cyan-500'>
                    View
                  </Link>
                  <Link to="/menus/$menuID/edit" params={{ menuID: menu.id.toString() }} className='font-medium text-cyan-600 hover:underline dark:text-cyan-500'>
                    Edit
                  </Link>
                </div>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  )
}
