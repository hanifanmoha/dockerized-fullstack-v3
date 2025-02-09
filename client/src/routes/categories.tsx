import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/categories')({
  component: AboutComponent,
})

function AboutComponent() {
  return (
    <h3>About</h3>
  )
}
