import React, { createContext, useReducer } from 'react';

const initialState = { harga: 0 };

const store = createContext(initialState);

const { Provider } = store;

const StateProvider = ({ children }) => {
    const [state, dispatch] = useReducer((oldState, action) => {
        switch (action.type) {
        case 'naik':
            return { ...oldState, harga: oldState.harga + 1 };
        case 'turun':
            return { ...oldState, harga: oldState.harga - 1 };
        case 'newInsertionCB':
            return { ...oldState, insertionCB: action.newInsertionCB };
        default:
            return new Error('Action type not recognized!');
        }
    }, initialState);

    return (
        <Provider value={{ state, dispatch }}>
            {' '}
            {children}
        </Provider>
    );
};

export { store, StateProvider };
