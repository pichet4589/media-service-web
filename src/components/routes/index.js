import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Dashboard from '../../containers/dashboard'
import Filemanager from '../../containers/filemanager'
import Document from '../../containers/documentApi'

export default function Routers() {
  return (
    <Switch>
      <Route exact component={Dashboard} path="/"></Route>
      <Route component={Document} path="/documentApi"></Route>
      <Route component={Filemanager} path="/filemanager"></Route>
    </Switch>
  )
}
