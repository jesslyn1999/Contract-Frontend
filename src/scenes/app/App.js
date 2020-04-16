import React from 'react';
import { StateProvider } from 'store/Store';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import AdminPage from 'scenes/administration-ui/AdminPage';
import CandidatePage from 'scenes/candidates-ui/CandidatePage';
import SectionPage from 'scenes/sections-ui/SectionPage';
import Template from 'scenes/template-ui/Template';
import SPPBJList from 'scenes/sppbj-ui/SPPBJList';
import DocumentCreatorSpbbjPage from 'scenes/document-ui/DocumentCreatorSpbbjPage';
import DocumentCreatorJamlakPage from 'scenes/document-ui/DocumentCreatorJamlakjPage';
import JamlakForm from 'scenes/jamlak-ui/JamlakForm';
import SpbbjPage from 'scenes/spbbj/SpbbjPage';

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
                    <Route key="sppbj" exact path="/sppbj" component={SPPBJList} />
                    <Route key="login" path="/login" component={Login} />
                    <Route key="candidate" path="/candidate" component={CandidatePage} />
                    <Route
                        key="create-spbbj"
                        path="/create-spbbj"
                        component={DocumentCreatorSpbbjPage}
                    />
                    <Route
                        key="create-jamlak"
                        path="/create-jamlak"
                        component={DocumentCreatorJamlakPage}
                    />
                    <Route key="jamlak-form" path="/jamlak-form" component={JamlakForm} />
                    <Route key="document" path="/document" component={SpbbjPage} />
            </Switch>
            </BrowserRouter>
        </StateProvider>
    );
};
