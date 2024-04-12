import { useEffect, useMemo, useState } from 'react';
import { Avatar, Box, Tooltip, Typography } from '@mui/material';
import { DataGrid, gridClasses } from '@mui/x-data-grid';
import { useValue } from '../../../context/ContextProvider';
import moment from 'moment';
import { grey } from '@mui/material/colors';
import isAdmin from '../utils/isAdmin';
import { getUserBookings } from '../../../actions/booking';

const MyBookings = ({ setSelectedLink, link }) => {
    const { state: { currentUser }, dispatch } = useValue();
    console.log(currentUser);

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

    useEffect(() => {
        console.log(userBookings);
    }, [userBookings])

    const columns = useMemo(
        () => [
            { field: '_id', headerName: 'Booking ID', width: 250 },
            {
                field: 'roomImg',
                headerName: 'Photo',
                width: 60,
                renderCell: (params) => <Avatar src={params.row.roomImg} />,
                sortable: false,
                filterable: false,
            },
            { field: 'title', headerName: 'Homestay Name', width: 250 },
            { field: 'location', headerName: 'Location', width: 110 },
            { field: 'daysOfStay', headerName: 'Ddays', width: 70, renderCell: (params) => params.row.daysOfStay.length + ' days' },
            { field: 'price', headerName: 'Price', width: 70, renderCell: (params) => '₹' + params.row.amount },
            {
                field: 'createdAt',
                headerName: 'Booked On',
                width: 200,
                renderCell: (params) =>
                    moment(params.row.createdAt).format('YYYY-MM-DD HH:MM:SS'),
            },
            // {
            //     field: 'actions',
            //     headerName: 'Actions',
            //     type: 'actions',
            //     width: 150,
            //     // renderCell: (params) => (
            //     //     // <RoomsActions {...{ params }} />
            //     // ),
            // },
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