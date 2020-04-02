import React from 'react';
import { StateProvider } from 'store/Store';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import AdminPage from 'scenes/administration-ui/AdminPage';
import SectionPage from 'scenes/sections-ui/SectionPage';
import Template from 'scenes/template-ui/Template';
import TemplateLanding from 'scenes/template-ui/TemplateLanding';

import Login from '../components/login.component';

export const App = () => {
    return (
        <StateProvider>
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
                    <Route key="section" exact path="/section" component={SectionPage} />
                    <Route key="template" exact path="/template" component={Template} />
                    <Route key="login" path="/login" component={Login} />
                </Switch>
            </BrowserRouter>
        </StateProvider>
    );
};
