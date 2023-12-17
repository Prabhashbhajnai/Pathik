import React, { createContext, useContext, useReducer } from 'react'
import reducer from './reducer'

const initailState = {
    currentUser: null,
    openLogin: false
}

const Context = createContext(initailState)

export const useValue = () => {
    return useContext(Context)
}

const ContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initailState)

    return (
        <Context.Provider value={{ state, dispatch }}>
            {children}
        </Context.Provider>
    )
}

export default ContextProvider