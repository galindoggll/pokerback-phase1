// import lib
import { lazy } from 'react'

const routes = [
  {
    path: '/',
    exact: true,
    component: lazy(() => import('./pages/home/private/index')),
  }
]

export default routes
