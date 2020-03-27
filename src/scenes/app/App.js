import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import AdminPage from 'scenes/administration-ui/AdminPage';
import SectionPage from 'scenes/sections-ui/SectionPage';
<<<<<<< HEAD
import TemplatesPage from 'scenes/templates-ui/TemplatesPage';
=======
import DocumentsPage from 'scenes/documents-ui/DocumentsPage';
>>>>>>> e3914696b721f227d9aabbdb7ae908a965a4f205

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
                <Route key="section" exact path="/section" component={SectionPage} />
<<<<<<< HEAD
                <Route key="template" exact path = "/template" component={TemplatesPage} />
=======
                <Route key="document" exact path = "/documents" component={DocumentsPage} />
>>>>>>> e3914696b721f227d9aabbdb7ae908a965a4f205
                <Route key={'login'} path="/login" component={Login} />
            </Switch>
        </BrowserRouter>
    );
};
