import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Cart from '../components/Cart';
import Login from '../components/Login';
import Menu from '../components/Menu';
import NotFound from '../components/NotFound';
import Register from '../components/Register';

const Main = () => {
    return (
        <Switch>
            <Route exact path={`/`}>
                <Menu/>            
            </Route>            
            <Route path={`/login`}>
                <Login/>            
            </Route>            
            <Route path={`/register`}>
                <Register/>            
            </Route>            
            <Route path={`/cart`}>
                <Cart/>            
            </Route>            
            <Route path={`*`}>
                <NotFound/>            
            </Route>            
        </Switch>
    );
}

export default Main;
