import fetchData from "./utils/fetchData"

const url = import.meta.env.VITE_SERVER_URL + '/booking'

export const createBooking = async (booking, currentUser, dispatch) => {
    dispatch({ type: 'START_LOADING' })

    const result = await fetchData(
        { url, body: booking, token: currentUser?.token },
        dispatch
    )
    if (result) {
        dispatch({
            type: 'UPDATE_ALERT',
            payload: {
                open: true,
                severity: 'success',
                message: 'The booking has been added successfully! To view your bookings, go to the Dashboard.'
            }
        })
    }
    dispatch({ type: 'END_LOADING' });

    return result
}

export const getUserBookings = async (userId, token) => {
    const result = await fetchData({ url: `${url}/user/${userId}`, method: 'GET', token: token })

    return result
}

export const deleteBooking = async (bookingId, token, dispatch) => {
    dispatch({ type: 'START_LOADING' });

    const result = await fetchData({ url: `${url}/${bookingId}`, method: 'DELETE', token: token })
    if (result) {
        dispatch({
            type: 'UPDATE_ALERT',
            payload: {
                open: true,
                severity: 'success',
                message: 'The booking has been deleted successfully'
            }
        })
    }

    dispatch({ type: 'END_LOADING' });

    return result
}

export const updateBooking = async (booking, token, dispatch) => {
    dispatch({ type: 'START_LOADING' })

    const result = await fetchData({ url: `${url}/${booking._id}`, method: 'PATCH', body: booking, token: token })

    if (result) {
        dispatch({
            type: 'UPDATE_ALERT',
            payload: {
                open: true,
                severity: 'success',
                message: 'The booking has been updated successfully'
            }
        })
    }

    dispatch({ type: 'END_LOADING' });

    return result
}

export const getHomestayBookings = async (homestayId, token) => {
    const result = await fetchData({ url: `${url}/homestay/${homestayId}`, method: 'GET', token: token})

    return result
}