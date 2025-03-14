import { createFileRoute, Link } from '@tanstack/react-router'
import { getMenu } from '../../../utils/restodb'
import Menu from '../../../model/Menu'

export const Route = createFileRoute('/menus/$menuID/')({
  component: RouteComponent,
  loader: async ({ params }) => {
    return {
      menu: await getMenu(parseInt(params.menuID)),
    }
  },
})

function RouteComponent() {
  const { menu } = Route.useLoaderData() as { menu: Menu }

  return (
    <>
      <div className="flex justify-end space-x-4">
        <Link to="/menus/$menuID/edit" params={{ menuID: menu.id.toString() }} className='font-medium text-cyan-600 hover:underline dark:text-cyan-500'>
          Edit
        </Link>
      </div>
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
        {menu.name}
      </h1>

      <div className="space-y-4">
        <div className="flex items-center justify-between border-b dark:border-gray-700 pb-4">
          <span className="text-gray-600 dark:text-gray-400">Category</span>
          <Link to="/categories/$categoryID" params={{ categoryID: menu.categoryID.toString() }} className='font-medium text-cyan-600 hover:underline dark:text-cyan-500'>
            {menu.getCategoryName()}
          </Link>
        </div>

        <div className="flex items-center justify-between border-b dark:border-gray-700 pb-4">
          <span className="text-gray-600 dark:text-gray-400">Price</span>
          <span className="font-medium text-gray-900 dark:text-white">
            IDR {menu.price}
          </span>
        </div>

        <div className="pt-2">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            Description
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            {menu.description || 'No description available'}
          </p>
        </div>
      </div>
    </>
  )
}
