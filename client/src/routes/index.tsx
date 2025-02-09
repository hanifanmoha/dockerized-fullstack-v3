import { createFileRoute } from '@tanstack/react-router'
import { Table } from "flowbite-react";
import Menu from '../model/Menu';

const hardcodedMenus = [
  {
    id: 1,
    name: 'Beef Steak',
    description: 'A delicious steak with a side of mashed potatoes',
    price: 25.99,
    category: {
      id: 1,
      name: 'Main Course'
    }
  },
  {
    id: 2,
    name: 'Grilled Salmon',
    description: 'A fresh salmon with a side of steamed vegetables',
    price: 22.99,
    category: {
      id: 1,
      name: 'Main Course'
    }
  },
  {
    id: 3,
    name: 'Chicken Alfredo',
    description: 'A creamy chicken Alfredo with a side of garlic bread',
    price: 18.99,
    category: {
      id: 1,
      name: 'Main Course'
    }
  },
  {
    id: 4,
    name: 'Pad Thai',
    description: 'Stir-fried rice noodles with shrimp, tofu, peanuts and tamarind sauce',
    price: 14.99,
    category: {
      id: 1,
      name: 'Main Course'
    }
  },
  {
    id: 5,
    name: 'Sushi Roll Platter',
    description: 'Assorted fresh sushi rolls with wasabi and pickled ginger',
    price: 24.99,
    category: {
      id: 1,
      name: 'Main Course'
    }
  },
  {
    id: 6,
    name: 'Korean BBQ Beef',
    description: 'Marinated grilled beef with kimchi and steamed rice',
    price: 19.99,
    category: {
      id: 1,
      name: 'Main Course'
    }
  },
  {
    id: 7,
    name: 'Iced Tea',
    description: 'A refreshing iced tea',
    price: 3.99,
    category: {
      id: 2,
      name: 'Beverage'
    }
  },
  {
    id: 8,
    name: 'Fresh Orange Juice',
    description: 'A fresh orange juice',
    price: 4.99,
    category: {
      id: 2,
      name: 'Beverage'
    }
  },
  {
    id: 9,
    name: 'Chocolate Cake with Ice Cream',
    description: 'A chocolate cake with a side of ice cream',
    price: 6.99,
    category: {
      id: 3,
      name: 'Dessert'
    }
  },
  {
    id: 10,
    name: 'Ice Cream Sundae',
    description: 'A delicious ice cream sundae',
    price: 5.99,
    category: {
      id: 3,
      name: 'Dessert'
    }
  }
]

export const Route = createFileRoute('/')({
  component: HomeComponent,
  loader: async () => {
    return {
      menus: hardcodedMenus.map(menu => Menu.fromJson(menu))
    }
  }
})

function HomeComponent() {
  const { menus } = Route.useLoaderData() as { menus: Menu[] }

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
