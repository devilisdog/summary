import React from 'react'

import Page1 from '../src/page/page1'
import Page2 from '../src/page/page2'
import HomePage from '../src/page/homePage'
import Tacos from '../src/page/Tacos'

const routes = [
    {
        path: '/homePage',
        component: HomePage,
    },
    {
        path: '/tacos',
        component: Tacos,
        routes: [
            {
                path: '/tacos/page1',
                component: Page1,
            },
            {
                path: '/tacos/page2',
                component: Page2,
            },
        ],
    },
]

export default routes
