import React from 'react'
import { HashRouter, Redirect } from 'react-router-dom'
import AsyncRouter, { RouterHooks } from '@src/components/asyncRouter.js'

import { Pcomp } from '@src/components'

const HomePage = AsyncRouter(() => import('@src/page/homePage'))
const VirtuaList = AsyncRouter(() => import('@src/page/virtuaList'))
const Login = AsyncRouter(() => import('@src/page/login'))
const Carousel = AsyncRouter(() => import('@src/page/carousel'))

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
        path: '/components',
        component: Pcomp,
        requiresAuth: false,
        routes: [
            {
                path: '/components/virtuaList',
                requiresAuth: false,
                exact: true,
                component: VirtuaList,
            },
            {
                path: '/components/Carousel',
                requiresAuth: false,
                exact: true,
                component: Carousel,
            },
        ],
    },
]

export default routes
