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
    { path: '/', exact: true, component: HomePage },
    { path: '/page1', component: Page1 },
    {
        path: '/page2',
        component: Pcomp,
        routes: [
            {
                path: '/page2/child1',
                component: Tacos,
            },
            {
                path: '/page2/child2',
                component: Tacos,
            },
        ],
    },
]

export default routes
