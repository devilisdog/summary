import React from 'react'
import { renderRoutes } from 'react-router-config'

const Pcomp = (props) => <>{renderRoutes(props.route.routes)}</>

export default Pcomp
