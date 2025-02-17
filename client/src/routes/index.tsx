import { createFileRoute, useNavigate } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: HomeComponent,
})

function HomeComponent() {

  const navigate = useNavigate()

  navigate({to : '/menus'})

  return (
    <div className="overflow-x-auto">
      <h1>Hello World</h1>
    </div>
  )
}
