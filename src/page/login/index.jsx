import React, { useContext } from 'react'
import { BrowserRouter as Router, Switch, Route, Link, Redirect, useHistory, useLocation } from 'react-router-dom'
import { authContext } from '../../components/ContextManager'

const login = () => {
    let history = useHistory()
    let { from } = { from: { pathname: '/homePage' } }
    let login = () => {
        history.replace(from)
    }

    return (
        <div>
            <p>You must log in to view the page at {from.pathname}</p>
            <button onClick={login}>Log in</button>
        </div>
    )
}

export default login
