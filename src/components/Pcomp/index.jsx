import React from 'react'
import renderRoutes from '../RenderRoutes'

const Pcomp = function (props) {
    const { route } = props
    return (
        <div>
            <h1>AdminLayout</h1>
            {renderRoutes(route.routes)}
        </div>
    )
}

export default Pcomp
