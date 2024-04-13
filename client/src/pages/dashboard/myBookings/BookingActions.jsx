import { Box, IconButton, Tooltip } from "@mui/material";
import { Delete, Edit, } from '@mui/icons-material'
import { useNavigate } from "react-router-dom"

// Context
import { useValue } from "../../../context/ContextProvider";

// Actions
import { deleteBooking } from "../../../actions/booking";

const BookingActions = ({ params, setUserBookings }) => {
    console.log(params.row);
    const { _id: bookingId } = params.row;
    const { dispatch, state: { currentUser } } = useValue();

    const navigate = useNavigate()

    const handleDelete = async () => {
        const res = await deleteBooking(bookingId, currentUser.token, dispatch)

        if (res)
            setUserBookings(prev => prev.filter(booking => booking._id !== bookingId))
    }

    const handleEdit = () => {
        let room = {
            bookingId: bookingId,
            roomId: params.row.roomId,
            title: params.row.title,
            location: params.row.location,
            roomImg: params.row.roomImg,
            checkIn: params.row.checkIn,
            checkOut: params.row.checkOut,
            amount: params.row.amount,
            daysOfStay: params.row.daysOfStay,
            roomsAvailable: params.row.roomsAvailable
        }

        navigate('/booking?newbooking=false', {state: { room }})
    }

    return (
        <Box>
            <Tooltip title='Edit Booking'>
                <IconButton onClick={handleEdit}>
                    <Edit />
                </IconButton>
            </Tooltip>
            <Tooltip title='Delete Booking'>
                <IconButton onClick={handleDelete}>
                    <Delete />
                </IconButton>
            </Tooltip>
        </Box >
    )
}

export default BookingActions