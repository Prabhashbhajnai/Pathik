import { useEffect, useMemo, useState } from 'react';
import { Avatar, Box, Tooltip, Typography } from '@mui/material';
import { DataGrid, gridClasses } from '@mui/x-data-grid';
import { useValue } from '../../../context/ContextProvider';
import moment from 'moment';
import { grey } from '@mui/material/colors';
import { getUserBookings } from '../../../actions/booking';
import BookingActions from './BookingActions';

const MyBookings = ({ setSelectedLink, link }) => {
    const { state: { currentUser } } = useValue();

    const [pageSize, setPageSize] = useState(5);
    const [userBookings, setUserBookings] = useState([]);

    useEffect(() => {
        setSelectedLink(link);

        const fetchData = async () => {
            const bookings = await getUserBookings(currentUser.id, currentUser.token);
            setUserBookings(bookings);
        }
        fetchData()
    }, []);

    Date.prototype.addDays = function (days) {
        var dat = new Date(this.valueOf()) // create new date object with current date
        dat.setDate(dat.getDate() + days); // add days to date object
        return dat; // return new date object
    }

    const columns = useMemo(
        () => [
            { field: '_id', headerName: 'Booking ID', width: 220 },
            {
                field: 'roomImg',
                headerName: 'Photo',
                width: 60,
                renderCell: (params) => <Avatar src={params.row.roomImg} />,
                sortable: false,
                filterable: false,
            },
            { field: 'title', headerName: 'Homestay Name', width: 220 },
            { field: 'location', headerName: 'Location', width: 220 },
            { field: 'daysOfStay', headerName: 'Days', width: 70, renderCell: (params) => params.row.daysOfStay.length + ' days' },
            { field: 'checkIn', headerName: 'Check-In', width: 170, renderCell: (params) => new Date(params.row.checkIn).toLocaleDateString('en-US', { month: 'long', day: '2-digit', year: 'numeric' }) },
            { field: 'checkOut', headerName: 'Check-Out', width: 170, renderCell: (params) => new Date(params.row.checkOut).addDays(1).toLocaleDateString('en-US', { month: 'long', day: '2-digit', year: 'numeric' }) },
            { field: 'price', headerName: 'Price', width: 70, renderCell: (params) => '₹' + params.row.amount },
            {
                field: 'createdAt',
                headerName: 'Booked On',
                width: 170,
                renderCell: (params) =>
                    moment(params.row.createdAt).format('YYYY-MM-DD HH:MM:SS'),
            },
            {
                field: 'actions',
                headerName: 'Actions',
                type: 'actions',
                width: 150,
                renderCell: (params) => (
                    // <BookingActions {...{ params }} />
                    <BookingActions params={params} setUserBookings={(updatedBookings) => setUserBookings(updatedBookings)} />
                ),
            },
        ],
        []
    );

    return (
        <Box
            sx={{
                height: 400,
                width: '100%',
            }}
        >
            <Typography
                variant="h3"
                component="h3"
                sx={{ textAlign: 'center', mt: 3, mb: 3 }}
            >
                My Bookings
            </Typography>
            <DataGrid
                columns={columns}
                rows={userBookings}
                getRowId={(row) => row._id}
                rowsPerPageOptions={[5, 10, 20]}
                pageSize={pageSize}
                onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                getRowSpacing={(params) => ({
                    top: params.isFirstVisible ? 0 : 5,
                    bottom: params.isLastVisible ? 0 : 5,
                })}
                sx={{
                    [`& .${gridClasses.row}`]: {
                        bgcolor: (theme) =>
                            theme.palette.mode === 'light' ? grey[200] : grey[900],
                    },
                }}
            />
        </Box>
    )
}

export default MyBookings