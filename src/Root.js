import React from 'react'
import App from './App'
import Login from '../src/containers/login'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { createBrowserHistory } from 'history'

const customHistory = createBrowserHistory()

const Root = () => {
  const token = localStorage.getItem('token')
  return (
    <div>
      <Router history={customHistory}>
        <Switch>
          {token ? <Route component={App} /> : <Route component={Login} />}
        </Switch>
      </Router>
    </div>
  )
}

export default Root
