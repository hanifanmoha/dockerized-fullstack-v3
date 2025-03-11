import { createFileRoute, Link } from '@tanstack/react-router'
import { getCategory } from '../../../utils/restodb'
import Category from '../../../model/Category'

export const Route = createFileRoute('/categories/$categoryID/')({
  component: RouteComponent,
  loader: async ({ params }) => {
    return {
      category: await getCategory(parseInt(params.categoryID))
    }
  }
})

function RouteComponent() {
  const { category } = Route.useLoaderData() as { category: Category }

  return <>
    <div className="flex justify-end space-x-4">
      <Link to="/categories/$categoryID/edit" params={{ categoryID: category.id.toString() }} className='font-medium text-cyan-600 hover:underline dark:text-cyan-500'>
        Edit
      </Link>
    </div>
    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
      {category.name}
    </h1>
  </>
}
