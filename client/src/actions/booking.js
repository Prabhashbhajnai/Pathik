import { useValue } from "../context/ContextProvider"
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
    const result = await fetchData({ url: `${url}/user/${userId}`, method: 'GET', token:token })
    console.log(result);
    return result
}