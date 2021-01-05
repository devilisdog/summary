import React from 'react'
import { HashRouter, Redirect } from 'react-router-dom'
import Pcomp from '../src/components/Pcomp'
import Page1 from '../src/page/page1'
import Page2 from '../src/page/page2'
import HomePage from '../src/page/homePage'
import Tacos from '../src/page/Tacos'
import Login from '../src/page/login'
import BseicLayout from '../src/page/layout'

const routes = [
    { path: '/login', exact: true, requiresAuth: false, component: Login, render: () => <Redirect to={'/login'} /> },
    { path: '/homePage', exact: true, requiresAuth: false, component: HomePage },
    { path: '/page1', component: Page1, requiresAuth: false },
    {
        path: '/page2',
        component: Pcomp,
        requiresAuth: false,
        routes: [
            {
                path: '/page2/child1',
                requiresAuth: true,
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
