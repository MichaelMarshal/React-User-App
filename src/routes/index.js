import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from '../App';
import Register from "../components/Register";
import Login from "../components/Login";

export default (
    <Route path='/' component={App}>
        <IndexRoute component={Login} />
        <Route path='login' component={Login} />
        <Route path='register' component={Register} />
    </Route>
);
