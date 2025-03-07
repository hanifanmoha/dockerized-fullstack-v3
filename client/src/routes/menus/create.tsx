import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { getCategories, saveMenu } from '../../utils/restodb'
import Category from '../../model/Category'
import { useForm } from '@tanstack/react-form'
import Menu from '../../model/Menu'

export const Route = createFileRoute('/menus/create')({
  component: RouteComponent,
  loader: async () => {
    const categories = await getCategories()
    return { categories }
  }
})

function RouteComponent() {
  const data = Route.useLoaderData() as { categories: Category[] }
  const categories = data.categories

  const navigate = useNavigate()

  const form = useForm({
    defaultValues: {
      name: 'initial name',
      price: 1000,
      category_id: 2,
      description: 'tet 123'
    },
    onSubmit: async ({ value }) => {
      const newMenu = new Menu({
        name: value.name,
        categoryID: value.category_id,
        price: value.price,
        description: value.description
      })
      try {
        const savedMenu = await saveMenu(newMenu)
        navigate({ to: '/menus' })
      }
      catch (error) {
        console.error(error)
        alert(error)
      }
    }
  })

  return (
    <>
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
        Create Menu Item
      </h1>

      <form className="space-y-6" onSubmit={e => {
        e.preventDefault()
        e.stopPropagation()
        form.handleSubmit()
      }}>
        <form.Field
          name='name'
          children={(field) => {
            return <div>
              <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Name
              </label>
              <input
                type="text"
                id="name"
                name='name'
                value={field.state.value}
                onChange={(e => field.handleChange(e.target.value))}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                required
              />
            </div>
          }}
        />

        <form.Field
          name='price'
          children={(field) => {
            return <div>
              <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Price (IDR)
              </label>
              <input
                type="number"
                id="price"
                name='price'
                value={field.state.value}
                onChange={(e => field.handleChange(Number(e.target.value)))}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                required
              />
            </div>
          }}
        />

        <form.Field
          name='category_id'
          children={(field) => {
            return <div>
              <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Category
              </label>
              <select
                id="category"
                name='category_id'
                value={field.state.value}
                onChange={(e => field.handleChange(Number(e.target.value)))}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                required
              >
                {categories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
          }}
        />

        <form.Field
          name="description"
          children={(field) => {
            return <div>
              <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Description
              </label>
              <textarea
                id="description"
                name='description'
                value={field.state.value}
                onChange={(e => field.handleChange(e.target.value))}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                required
              />
            </div>
          }}
        />

        <div className="flex justify-end space-x-4">
          <button
            type="submit"
            className="px-4 py-2 text-sm font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Save
          </button>
        </div>
      </form>
    </>
  )
}
