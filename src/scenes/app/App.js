import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import AdminPage from 'scenes/administration-ui/AdminPage';
import SectionPage from 'scenes/sections-ui/SectionPage';

import Login from '../components/login.component';

export const App = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route
                    key={'home'}
                    exact
                    path="/"
                    render={() => (
                        <div>
                            <h1>This is home</h1>
                        </div>
                    )}
                />
                <Route key="admin" exact path="/admin" render={AdminPage} />
                <Route key="section" exact path="/section" render={SectionPage} />
                <Route key={'login'} path="/login" component={Login} />
            </Switch>
        </BrowserRouter>
    );
};
