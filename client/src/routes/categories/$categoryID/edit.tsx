import { createFileRoute } from '@tanstack/react-router'
import { getCategory, updateCategory } from '../../../utils/restodb'
import Category from '../../../model/Category'
import { useNavigate } from '@tanstack/react-router'
import { useForm } from '@tanstack/react-form'

export const Route = createFileRoute('/categories/$categoryID/edit')({
    component: RouteComponent,
    loader: async ({ params }) => {
        return {
            category: await getCategory(parseInt(params.categoryID))
        }
    }
})

function RouteComponent() {
    const { category } = Route.useLoaderData()
    const navigate = useNavigate()

    const form = useForm({
        defaultValues: {
            id: category.id,
            name: category.name
        },
        onSubmit: async ({ value }) => {
            const newCategory = new Category({
                id: value.id,
                name: value.name
            })
            try {
                const updatedCategory = await updateCategory(newCategory)
                navigate({ to: '/categories', params: { categoryID: updatedCategory.id.toString() } })
            } catch (error) {
                console.error(error)
                alert(error)
            }
        }
    })

    return <>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            Edit Category Item
        </h1>

        <form className='space-y-6' onSubmit={(e) => {
            e.preventDefault()
            e.stopPropagation()
            form.handleSubmit()
        }}>
            <form.Field
                name='name'
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
                        </div>
                    )
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
}
