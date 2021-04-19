import React, { useEffect, useContext, createContext, useState } from 'react'
import { BrowserRouter as Router, Switch, Route, Link, Redirect, useHistory, useLocation } from 'react-router-dom'
import Tree from './components/Tree'
import routes from '../config/routes'
import menuList from '../config/meun'
import loadable from '@loadable/component'
import renderRoutes from './components/RenderRoutes'
import { authContext } from './components/ContextManager'

import { RouterHooks } from '@src/components/asyncRouter.js'

const { beforeRouterComponentLoad, afterRouterComponentDidLoaded } = RouterHooks

export default function App() {
    const onSelect = (item) => {}

    useEffect(() => {
        /* 增加监听函数 */
        beforeRouterComponentLoad((history) => {
            console.log('当前激活的路由是', history.location.pathname)
        })
    }, [])

    return (
        <authContext.Provider value={{}}>
            <Router>
                <div className="main" id="main">
                    <div className="menu">
                        <Tree treeData={menuList} onSelect={onSelect} defaultExpandedKeys={['0-0-0']} />
                    </div>

                    <div className="content" id="content">
                        {renderRoutes(routes)}
                    </div>
                </div>
            </Router>
        </authContext.Provider>
    )
}
