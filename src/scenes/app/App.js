import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

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
            </Switch>
        </BrowserRouter>
    );
};
