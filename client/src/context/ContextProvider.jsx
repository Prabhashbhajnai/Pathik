import React, { createContext, useContext, useEffect, useReducer } from 'react'
import reducer from './reducer'

const initailState = {
    currentUser: null,
    openLogin: false,
    loading: false,
    alert: { open: false, severity: 'info', message: '' },
    profile:{open:false,file: null,photoURL:''},
    images: [],
}

const Context = createContext(initailState)

export const useValue = () => {
    return useContext(Context)
}

const ContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initailState)

    useEffect(() => {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser) {
            dispatch({ type: 'UPDATE_USER', payload: currentUser });
        }
    }, []);

    return (
        <Context.Provider value={{ state, dispatch }}>
            {children}
        </Context.Provider>
    )
}

export default ContextProvider