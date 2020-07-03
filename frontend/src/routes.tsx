import React from 'react';
import { Route, Switch } from 'react-router-dom';

import SignIn from './pages/SignIn';
import Dashboard from './pages/Dashboard';
import SignUp from './pages/SignUp';
import Edit from './pages/Edit';


function Routes() {
    return (
        <Switch>
            <Route path="/" exact component={SignIn}/>
            <Route path="/logon" exact component={SignUp}/>
            <Route path="/dashboard/:id" exact component={Dashboard}/>
            <Route path="/edit/:id" exact component={Edit}/>
        </Switch>
    )
}


export default Routes;