import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: HomeComponent,
})

function HomeComponent() {

  return (
    <div className="overflow-x-auto">
      <h1>Hello World</h1>
    </div>
  )
}
