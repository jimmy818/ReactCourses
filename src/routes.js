import React from 'react';
import {Router, Route, browserHistory} from 'react-router';
import ReactDOM from 'react-dom';
import Login from './login/login';
import App from "./App";



ReactDOM.render(
    <Router history={browserHistory}>
        <Route path={"/"} component={App}/>
        <Route path={"login"} component={Login}/>
    </Router>,
);