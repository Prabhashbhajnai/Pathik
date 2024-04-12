import { Box, IconButton, Tooltip } from "@mui/material";
import { Delete, Edit, Preview, } from '@mui/icons-material'

// Context
import { useValue } from "../../../context/ContextProvider";

// Actions
import { deleteBooking } from "../../../actions/booking";

const BookingActions = ({ params, setUserBookings }) => {
    const { _id: bookingId } = params.row;
    const { dispatch, state: { currentUser } } = useValue();

    const handleDelete = async () => {
        const res = await deleteBooking(bookingId, currentUser.token, dispatch)

        if (res)
            setUserBookings(prev => prev.filter(booking => booking._id !== bookingId))
    }

    return (
        <Box>
            <Tooltip title='Edit Booking'>
                <IconButton onClick={() => { }}>
                    <Edit />
                </IconButton>
            </Tooltip>
            <Tooltip title='Delete Booking'>
                <IconButton onClick={handleDelete}>
                    <Delete />
                </IconButton>
            </Tooltip>
        </Box>
    )
}

export default BookingActions