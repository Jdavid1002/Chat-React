import React from 'react';
import {
    HashRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import Login from '../views/Login';
import Register from '../views/Register'
import Dashboard from '../views/user/Dashboard';
import Welcome from '../views/Welcome';
import { useSelector } from 'react-redux';

const Rutas = () => {

    const User = useSelector(state => state.user)

    return (
        <div>
            <Router>
                <Switch>
                    <Route path="/Login">
                        { !User ?  <Login />  : <Dashboard /> }
                    </Route>
                    <Route path="/Register">
                        { !User ?  <Register />  : <Dashboard /> }
                    </Route>

                    <Route path="/Dashboard">
                        { !User ? <Login /> :  <Dashboard /> }
                    </Route>
                    <Route path="/">
                    { !User ? <Welcome /> :  <Dashboard /> }
                    </Route>
                </Switch>
            </Router>
        </div>
    );
}
 
export default Rutas;