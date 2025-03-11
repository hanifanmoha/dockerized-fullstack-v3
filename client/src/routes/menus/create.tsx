import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { getCategories, saveMenu } from '../../utils/restodb'
import Category from '../../model/Category'
import { useForm } from '@tanstack/react-form'
import Menu from '../../model/Menu'
import FieldError from '../../components/FieldError'

export const Route = createFileRoute('/menus/create')({
  component: RouteComponent,
  loader: async () => {
    const categories = await getCategories()
    return { categories }
  }
})

function RouteComponent() {
  const { categories } = Route.useLoaderData()

  const navigate = useNavigate()

  const form = useForm({
    defaultValues: {
      name: '',
      price: '',
      category_id: 0,
      description: ''
    },
    onSubmit: async ({ value }) => {
      const newMenu = new Menu({
        name: value.name,
        categoryID: value.category_id,
        price: Number(value.price),
        description: value.description
      })
      try {
        const savedMenu = await saveMenu(newMenu)
        navigate({ to: '/menus/$menuID', params: { menuID: savedMenu.id.toString() } })
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
              <FieldError errors={field.state.meta.errors} />
            </div>
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
                name='price'
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
              <FieldError errors={field.state.meta.errors} />
            </div>
          }}
        />

        <form.Field
          name="description"
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
                value={field.state.value}
                onChange={(e => field.handleChange(e.target.value))}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                required
              />
              <FieldError errors={field.state.meta.errors} />
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
