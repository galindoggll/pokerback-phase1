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
    path: '/players/view-report/:id/:type',
    exact: true,
    auth: true,
    component: lazy(() => import('./pages/view/index')),
  },
  {
    path: '/players/set-percentage/:id',
    exact: true,
    auth: true,
    component: lazy(() => import('./pages/percentage/index')),
  },
  {
    path: '/players/agent-list/:id',
    exact: true,
    auth: true,
    component: lazy(() => import('./pages/agentPlayersList/index')),
  },
]
