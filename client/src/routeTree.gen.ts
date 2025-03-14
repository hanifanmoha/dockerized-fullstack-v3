/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as IndexImport } from './routes/index'
import { Route as MenusIndexImport } from './routes/menus/index'
import { Route as CategoriesIndexImport } from './routes/categories/index'
import { Route as MenusCreateImport } from './routes/menus/create'
import { Route as CategoriesCreateImport } from './routes/categories/create'
import { Route as MenusMenuIDIndexImport } from './routes/menus/$menuID/index'
import { Route as CategoriesCategoryIDIndexImport } from './routes/categories/$categoryID/index'
import { Route as MenusMenuIDEditImport } from './routes/menus/$menuID/edit'
import { Route as CategoriesCategoryIDEditImport } from './routes/categories/$categoryID/edit'

// Create/Update Routes

const IndexRoute = IndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const MenusIndexRoute = MenusIndexImport.update({
  id: '/menus/',
  path: '/menus/',
  getParentRoute: () => rootRoute,
} as any)

const CategoriesIndexRoute = CategoriesIndexImport.update({
  id: '/categories/',
  path: '/categories/',
  getParentRoute: () => rootRoute,
} as any)

const MenusCreateRoute = MenusCreateImport.update({
  id: '/menus/create',
  path: '/menus/create',
  getParentRoute: () => rootRoute,
} as any)

const CategoriesCreateRoute = CategoriesCreateImport.update({
  id: '/categories/create',
  path: '/categories/create',
  getParentRoute: () => rootRoute,
} as any)

const MenusMenuIDIndexRoute = MenusMenuIDIndexImport.update({
  id: '/menus/$menuID/',
  path: '/menus/$menuID/',
  getParentRoute: () => rootRoute,
} as any)

const CategoriesCategoryIDIndexRoute = CategoriesCategoryIDIndexImport.update({
  id: '/categories/$categoryID/',
  path: '/categories/$categoryID/',
  getParentRoute: () => rootRoute,
} as any)

const MenusMenuIDEditRoute = MenusMenuIDEditImport.update({
  id: '/menus/$menuID/edit',
  path: '/menus/$menuID/edit',
  getParentRoute: () => rootRoute,
} as any)

const CategoriesCategoryIDEditRoute = CategoriesCategoryIDEditImport.update({
  id: '/categories/$categoryID/edit',
  path: '/categories/$categoryID/edit',
  getParentRoute: () => rootRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/categories/create': {
      id: '/categories/create'
      path: '/categories/create'
      fullPath: '/categories/create'
      preLoaderRoute: typeof CategoriesCreateImport
      parentRoute: typeof rootRoute
    }
    '/menus/create': {
      id: '/menus/create'
      path: '/menus/create'
      fullPath: '/menus/create'
      preLoaderRoute: typeof MenusCreateImport
      parentRoute: typeof rootRoute
    }
    '/categories/': {
      id: '/categories/'
      path: '/categories'
      fullPath: '/categories'
      preLoaderRoute: typeof CategoriesIndexImport
      parentRoute: typeof rootRoute
    }
    '/menus/': {
      id: '/menus/'
      path: '/menus'
      fullPath: '/menus'
      preLoaderRoute: typeof MenusIndexImport
      parentRoute: typeof rootRoute
    }
    '/categories/$categoryID/edit': {
      id: '/categories/$categoryID/edit'
      path: '/categories/$categoryID/edit'
      fullPath: '/categories/$categoryID/edit'
      preLoaderRoute: typeof CategoriesCategoryIDEditImport
      parentRoute: typeof rootRoute
    }
    '/menus/$menuID/edit': {
      id: '/menus/$menuID/edit'
      path: '/menus/$menuID/edit'
      fullPath: '/menus/$menuID/edit'
      preLoaderRoute: typeof MenusMenuIDEditImport
      parentRoute: typeof rootRoute
    }
    '/categories/$categoryID/': {
      id: '/categories/$categoryID/'
      path: '/categories/$categoryID'
      fullPath: '/categories/$categoryID'
      preLoaderRoute: typeof CategoriesCategoryIDIndexImport
      parentRoute: typeof rootRoute
    }
    '/menus/$menuID/': {
      id: '/menus/$menuID/'
      path: '/menus/$menuID'
      fullPath: '/menus/$menuID'
      preLoaderRoute: typeof MenusMenuIDIndexImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '/categories/create': typeof CategoriesCreateRoute
  '/menus/create': typeof MenusCreateRoute
  '/categories': typeof CategoriesIndexRoute
  '/menus': typeof MenusIndexRoute
  '/categories/$categoryID/edit': typeof CategoriesCategoryIDEditRoute
  '/menus/$menuID/edit': typeof MenusMenuIDEditRoute
  '/categories/$categoryID': typeof CategoriesCategoryIDIndexRoute
  '/menus/$menuID': typeof MenusMenuIDIndexRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '/categories/create': typeof CategoriesCreateRoute
  '/menus/create': typeof MenusCreateRoute
  '/categories': typeof CategoriesIndexRoute
  '/menus': typeof MenusIndexRoute
  '/categories/$categoryID/edit': typeof CategoriesCategoryIDEditRoute
  '/menus/$menuID/edit': typeof MenusMenuIDEditRoute
  '/categories/$categoryID': typeof CategoriesCategoryIDIndexRoute
  '/menus/$menuID': typeof MenusMenuIDIndexRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexRoute
  '/categories/create': typeof CategoriesCreateRoute
  '/menus/create': typeof MenusCreateRoute
  '/categories/': typeof CategoriesIndexRoute
  '/menus/': typeof MenusIndexRoute
  '/categories/$categoryID/edit': typeof CategoriesCategoryIDEditRoute
  '/menus/$menuID/edit': typeof MenusMenuIDEditRoute
  '/categories/$categoryID/': typeof CategoriesCategoryIDIndexRoute
  '/menus/$menuID/': typeof MenusMenuIDIndexRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | '/'
    | '/categories/create'
    | '/menus/create'
    | '/categories'
    | '/menus'
    | '/categories/$categoryID/edit'
    | '/menus/$menuID/edit'
    | '/categories/$categoryID'
    | '/menus/$menuID'
  fileRoutesByTo: FileRoutesByTo
  to:
    | '/'
    | '/categories/create'
    | '/menus/create'
    | '/categories'
    | '/menus'
    | '/categories/$categoryID/edit'
    | '/menus/$menuID/edit'
    | '/categories/$categoryID'
    | '/menus/$menuID'
  id:
    | '__root__'
    | '/'
    | '/categories/create'
    | '/menus/create'
    | '/categories/'
    | '/menus/'
    | '/categories/$categoryID/edit'
    | '/menus/$menuID/edit'
    | '/categories/$categoryID/'
    | '/menus/$menuID/'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  CategoriesCreateRoute: typeof CategoriesCreateRoute
  MenusCreateRoute: typeof MenusCreateRoute
  CategoriesIndexRoute: typeof CategoriesIndexRoute
  MenusIndexRoute: typeof MenusIndexRoute
  CategoriesCategoryIDEditRoute: typeof CategoriesCategoryIDEditRoute
  MenusMenuIDEditRoute: typeof MenusMenuIDEditRoute
  CategoriesCategoryIDIndexRoute: typeof CategoriesCategoryIDIndexRoute
  MenusMenuIDIndexRoute: typeof MenusMenuIDIndexRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  CategoriesCreateRoute: CategoriesCreateRoute,
  MenusCreateRoute: MenusCreateRoute,
  CategoriesIndexRoute: CategoriesIndexRoute,
  MenusIndexRoute: MenusIndexRoute,
  CategoriesCategoryIDEditRoute: CategoriesCategoryIDEditRoute,
  MenusMenuIDEditRoute: MenusMenuIDEditRoute,
  CategoriesCategoryIDIndexRoute: CategoriesCategoryIDIndexRoute,
  MenusMenuIDIndexRoute: MenusMenuIDIndexRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/categories/create",
        "/menus/create",
        "/categories/",
        "/menus/",
        "/categories/$categoryID/edit",
        "/menus/$menuID/edit",
        "/categories/$categoryID/",
        "/menus/$menuID/"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/categories/create": {
      "filePath": "categories/create.tsx"
    },
    "/menus/create": {
      "filePath": "menus/create.tsx"
    },
    "/categories/": {
      "filePath": "categories/index.tsx"
    },
    "/menus/": {
      "filePath": "menus/index.tsx"
    },
    "/categories/$categoryID/edit": {
      "filePath": "categories/$categoryID/edit.tsx"
    },
    "/menus/$menuID/edit": {
      "filePath": "menus/$menuID/edit.tsx"
    },
    "/categories/$categoryID/": {
      "filePath": "categories/$categoryID/index.tsx"
    },
    "/menus/$menuID/": {
      "filePath": "menus/$menuID/index.tsx"
    }
  }
}
ROUTE_MANIFEST_END */
