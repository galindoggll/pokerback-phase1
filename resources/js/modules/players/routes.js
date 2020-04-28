// import lib
import { lazy } from 'react'

export default [
  {
    path: '/players',
    exact: true,
    auth: true,
    component: lazy(() => import('./pages/list/index')),
  },
  {
    path: '/players/view-report/:id',
    exact: true,
    auth: true,
    component: lazy(() => import('./pages/view/index')),
  },
]
