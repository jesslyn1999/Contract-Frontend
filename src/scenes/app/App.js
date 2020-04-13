import React from 'react';
import { StateProvider } from 'store/Store';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import AdminPage from 'scenes/administration-ui/AdminPage';
import CandidatePage from 'scenes/candidates-ui/CandidatePage';
import SectionPage from 'scenes/sections-ui/SectionPage';
import JamlakPage from 'scenes/jamlak-ui/JamlakPage';
import Template from 'scenes/template-ui/Template';
import SelectTemplatePage from 'scenes/template-ui/create-new-template/SelectTemplatePage';

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
                    <Route key="admin" path="/admin" render={AdminPage} />
                    <Route key="section" path="/section" component={SectionPage} />
                    <Route key="template" path="/template" component={Template} />
                    <Route key="jamlak" exact path="/jamlak" component={JamlakPage} />
                    <Route key="login" path="/login" component={Login} />
                    <Route
                        key="select-template"
                        exact
                        path="/select-template"
                        component={SelectTemplatePage}
                    />
                </Switch>
            </BrowserRouter>
        </StateProvider>
    );
};
