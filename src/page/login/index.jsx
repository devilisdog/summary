import React, { useContext } from 'react'
import { BrowserRouter as Router, Switch, Route, Link, Redirect, useHistory, useLocation } from 'react-router-dom'
import { authContext } from '../../components/ContextManager'

const login = () => {
    let history = useHistory()
    let { from } = { from: { pathname: '/homePage' } }
    let login = () => {
        history.replace(from)
    }

    const data = [
        ['a', 'aa', 'aaa', 'aaaa'],
        ['b', 'bb', 'bbb'],
        ['a', 'ab', 'aba'],
        ['a', 'aa', 'aab'],
    ]

    function toTree(arr) {
        const obj = {}
        const res = []
        for (let i = 0; i < arr.length; i++) {
            for (let j = 0; j < arr[i].length; j++) {
                const item = arr[i][j]

                if (!obj[item]) {
                    obj[item] = {
                        name: item,
                        child: [],
                    }
                }
                if (j > 0) {
                    const parent = obj[arr[i][j - 1]]

                    if (parent) {
                        if (parent.child.indexOf(obj[item]) < 0) {
                            parent.child.push(obj[item])
                        }
                    }
                } else {
                    if (res.indexOf(obj[item]) < 0) {
                        res.push(obj[item])
                    }
                }
            }
        }
        return res
    }

    console.log(toTree(data), 'toTree(data)')

    return (
        <div>
            <p>You must log in to view the page at {from.pathname}</p>
            <button onClick={login}>Log in</button>
        </div>
    )
}

export default login
