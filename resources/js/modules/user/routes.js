// import lib
import { lazy } from 'react'

export default [
  {
    path: '/profile/:id',
    exact: true,
    auth: true,
    component: lazy(() => import('./pages/view/index')),
  },
  {
    path: '/profile/edit/:id',
    exact: true,
    auth: true,
    component: lazy(() => import('./pages/edit/index')),
  },
]
