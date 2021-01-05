import React from 'react'
import { Switch, Route, Redirect } from 'react-router'

function renderRoutes(routes, authed = false, authPath = '/login', extraProps = {}, switchProps = {}) {
    return routes ? (
        <Switch {...switchProps}>
            {routes.map((route, i) => (
                <Route
                    key={route.key || i}
                    path={route.path}
                    exact={route.exact}
                    strict={route.strict}
                    render={(props) => {
                        if (!route.requiresAuth || authed || route.path === authPath) {
                            return <route.component {...props} {...extraProps} route={route} />
                        } else {
                            window.alert('请先登陆')
                            return <Redirect to={{ pathname: authPath, state: { from: props.location } }} />
                        }
                    }}
                />
            ))}
        </Switch>
    ) : null
}

export default renderRoutes
