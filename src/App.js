import React, { useContext, createContext, useState } from 'react'
import { BrowserRouter as Router, Switch, Route, Link, Redirect, useHistory, useLocation } from 'react-router-dom'
import Tree from './components/Tree'
import routes from '../config/routes'
import menuList from '../config/meun'
import loadable from '@loadable/component'
import renderRoutes from './components/RenderRoutes'
import { authContext } from './components/ContextManager'

export default function App() {
    const onSelect = (item) => {}

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
