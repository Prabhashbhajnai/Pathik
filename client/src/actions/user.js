import fetchData from "./utils/fetchData"

const url = import.meta.env.VITE_SERVER_URL + '/user'

// Signup
export const register = async (user, dispatch) => {
    dispatch({ type: 'START_LOADING' })

    const result = await fetchData({ url: url + '/register', body: user }, dispatch)

    if (result) {
        dispatch({ type: 'UPDATE_USER', payload: result })
        dispatch({ type: 'CLOSE_LOGIN' });
        dispatch({
            type: 'UPDATE_ALERT',
            payload: {
                open: true,
                severity: 'success',
                message: 'Your account has been created successfully',
            },
        });
    }

    dispatch({ type: 'END_LOADING' })
}

// Login
export const login = async (user, dispatch) => {
    dispatch({ type: 'START_LOADING' })

    const result = await fetchData({ url: url + '/login', body: user }, dispatch)

    if (result) {
        dispatch({ type: 'UPDATE_USER', payload: result })
        dispatch({ type: 'CLOSE_LOGIN' });
        dispatch({
            type: 'UPDATE_ALERT',
            payload: {
                open: true,
                severity: 'success',
                message: 'Your have logged in successfully',
            },
        });
    }

    dispatch({ type: 'END_LOADING' })
}