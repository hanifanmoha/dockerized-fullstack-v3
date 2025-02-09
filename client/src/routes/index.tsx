import { createFileRoute } from '@tanstack/react-router'
import { Table } from "flowbite-react";
import Menu from '../model/Menu';
import { getMenus } from '../utils/restodb';

export const Route = createFileRoute('/')({
  component: HomeComponent,
  loader: async () => {
    return {
      menus: await getMenus() as Menu[]
    }
  }
})

function HomeComponent() {

  const data = Route.useLoaderData() as { menus: Menu[] }
  const menus = data.menus.map(menu => new Menu(menu))

  return (
    <div className="overflow-x-auto">
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
                <a href="#" className="font-medium text-cyan-600 hover:underline dark:text-cyan-500">
                  Edit
                </a>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  )
}
