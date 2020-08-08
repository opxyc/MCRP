import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import HomePage from './components/HomePage'
import RegisterPage from './components/commonUserPage/RegisterPage'
import Login from './components/policeDashBoard/Login'
import Dashboard from './components/policeDashBoard/Dashboard'
import ClosedIncidents from './components/policeDashBoard/ClosedIncidents'

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={HomePage} />
        <Route path='/register' exact component={RegisterPage} />
        <Route path='/admin/login' exact component={Login} />
        <Route path='/admin' exact component={Dashboard} />
        <Route path='/admin/closed' exact component={ClosedIncidents} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
