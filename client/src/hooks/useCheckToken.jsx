import React, { useEffect } from 'react'
import { jwtDecode } from 'jwt-decode';

// Context
import { useValue } from '../context/ContextProvider'

const useCheckToken = () => {
    const { state: { currentUser }, dispatch } = useValue()

    useEffect(() => {
        if (currentUser) {
            const decodeToken = jwtDecode(currentUser.token)
            if (decodeToken.exp * 1000 < new Date().getTime()) {
                dispatch({ type: 'UPDATE_USER', payload: null })
            }
        }
    }, [])
}

export default useCheckToken