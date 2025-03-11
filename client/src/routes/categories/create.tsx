import { useForm } from '@tanstack/react-form'
import { createFileRoute } from '@tanstack/react-router'
import { useNavigate } from '@tanstack/react-router'
import Category from '../../model/Category'
import { saveCategory } from '../../utils/restodb'
import FieldError from '../../components/FieldError'

export const Route = createFileRoute('/categories/create')({
    component: RouteComponent,
})

function RouteComponent() {

    const navigate = useNavigate()

    const form = useForm({
        defaultValues: {
            name: '',
        },
        onSubmit: async ({ value }) => {
            const newCategory = new Category({
                name: value.name
            })
            try {
                const savedCategory = await saveCategory(newCategory)
                navigate({ to: '/categories/$categoryID', params: { categoryID: savedCategory.id.toString() } })
            }
            catch (error) {
                console.error(error)
                alert(error)
            }
        }
    })

    return <>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            Create Category Item
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
}
