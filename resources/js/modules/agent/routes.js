// import lib
import { lazy } from 'react'

export default [
  {
    path: '/agents',
    exact: true,
    auth: true,
    component: lazy(() => import('./pages/list/index')),
  },
  {
    path: '/agent/:id',
    exact: true,
    auth: true,
    component: lazy(() => import('./pages/view/index')),
  },
]
