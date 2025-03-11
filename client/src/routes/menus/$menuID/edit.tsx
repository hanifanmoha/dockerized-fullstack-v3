import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useForm } from '@tanstack/react-form'
import { getMenu, getCategories, updateMenu } from '../../../utils/restodb'
import Category from '../../../model/Category'
import Menu from '../../../model/Menu'
import FieldError from '../../../components/FieldError'

export const Route = createFileRoute('/menus/$menuID/edit')({
  component: RouteComponent,
  loader: async ({ params }) => {
    return {
      menu: await getMenu(parseInt(params.menuID)),
      categories: await getCategories()
    }
  }
})

function RouteComponent() {
  const data = Route.useLoaderData()
  const menu = data.menu
  const categories = data.categories

  const navigate = useNavigate()

  const form = useForm({
    defaultValues: {
      id: menu.id,
      name: menu.name,
      category_id: menu.categoryID,
      price: menu.price.toString(),
      description: menu.description
    },
    onSubmit: async ({ value }) => {
      const newMenu = new Menu({
        id: value.id,
        name: value.name,
        categoryID: value.category_id,
        price: Number(value.price),
        description: value.description
      })
      try {
        const updatedMenu = await updateMenu(newMenu)
        navigate({ to: '/menus', params: { menuID: menu.id.toString() } })
      } catch (error) {
        console.error(error)
        alert(error)
      }
    }
  })

  return (
    <>
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
        Edit Menu Item
      </h1>

      <form className="space-y-6" onSubmit={(e) => {
        e.preventDefault()
        e.stopPropagation()
        form.handleSubmit()
      }}>
        <form.Field
          name='name'
          validators={{
            onChange: ({ value }) => {
              if (!value) {
                return 'Name is required'
              }
              if (value.length < 3) {
                return 'Name must be at least 3 characters long'
              }
              return undefined
            }
          }}
          children={(field) => {
            return (
              <div>
                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name='name'
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                  required
                />
                <FieldError errors={field.state.meta.errors} />
              </div>
            )
          }}
        />

        <form.Field
          name='price'
          validators={{
            onChange: ({ value }) => {
              if (!value) {
                return 'Price is required'
              }
              if (!Number(value)) {
                return 'Price must be a number'
              }
              if (Number(value) < 0) {
                return 'Price must be a positive number'
              }
              return undefined
            }
          }}
          children={(field) => {
            return <div>
              <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Price (IDR)
              </label>
              <input
                type="number"
                id="price"
                name="price"
                value={field.state.value}
                onChange={(e => {
                  const val = !e.target.value ? '' : Number(e.target.value) + ''
                  field.handleChange(val)
                })}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                required
              />
              <FieldError errors={field.state.meta.errors} />
            </div>
          }}
        />

        <form.Field
          name='category_id'
          validators={{
            onChange: ({ value }) => {
              if (!value) {
                return 'Category is required'
              }
              return undefined
            }
          }}
          children={(field) => {
            return <div>
              <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Category
              </label>
              <select
                id="category"
                name='category'
                value={field.state.value}
                onChange={(e) => field.handleChange(Number(e.target.value))}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              >
                {categories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
              <FieldError errors={field.state.meta.errors} />
            </div>
          }}
        />

        <form.Field
          name='description'
          validators={{
            onChange: ({ value }) => {
              if (!value) {
                return 'Description is required'
              }
              if (value.length < 3) {
                return 'Description must be at least 3 characters long'
              }
              return undefined
            }
          }}
          children={(field) => {
            return <div>
              <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Description
              </label>
              <textarea
                id="description"
                name='description'
                rows={4}
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
              />
              <FieldError errors={field.state.meta.errors} />
            </div>
          }}
        />

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => window.history.back()}
            className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 text-sm font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Save Changes
          </button>
        </div>
      </form>
    </>
  )

}
