import { createRouter as createTanstackRouter } from '@tanstack/react-router'
import { routeTree } from './routeTree.gen'

export function createRouter(params: any) {
    const router = createTanstackRouter({
        routeTree,
        ...params,
    })

    return router
}

declare module '@tanstack/react-router' {
    interface Register {
        router: ReturnType<typeof createRouter>
    }
}

