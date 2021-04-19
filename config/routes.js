import React from 'react'
import { HashRouter, Redirect } from 'react-router-dom'
import AsyncRouter, { RouterHooks } from '@src/components/asyncRouter.js'

import { Pcomp } from '@src/components'

const HomePage = AsyncRouter(() => import('@src/page/homePage'))
const Tacos = AsyncRouter(() => import('@src/page/Tacos'))
const Login = AsyncRouter(() => import('@src/page/login'))

// const HomePage = AsyncRouter(()=>import('@src/page/homePage'))

import ComponentsView from '@src/page/componentsView'

const routes = [
    {
        path: '/login',
        exact: true,
        requiresAuth: false,
        component: Login,
        render: () => <Redirect to={'/login'} />,
    },
    { path: '/homePage', exact: true, requiresAuth: false, component: HomePage },
    { path: '/componentsView', component: ComponentsView, requiresAuth: false },
    {
        path: '/page2',
        component: Pcomp,
        requiresAuth: false,
        routes: [
            {
                path: '/page2/child1',
                requiresAuth: false,
                exact: true,
                component: Tacos,
            },
            {
                path: '/page2/child2',
                exact: true,
                requiresAuth: false,
                component: Tacos,
            },
        ],
    },
]

export default routes
