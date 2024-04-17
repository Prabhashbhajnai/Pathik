import { useEffect, useMemo, useState } from 'react';
import { Avatar, Box, Tooltip, Typography } from '@mui/material';
import { DataGrid, gridClasses } from '@mui/x-data-grid';
import { useValue } from '../../../context/ContextProvider';
import moment from 'moment';
import { grey } from '@mui/material/colors';

// Actions
import { getUserRooms } from '../../../actions/room';

// Components
import HomestayDropdown from '../../../components/HomestayDropdown';
import { getHomestayBookings } from '../../../actions/booking';

const HostedReservations = ({ setSelectedLink, link }) => {
    const columns = useMemo(() => [
        { field: '_id', headerName: 'Booking ID', width: 220 },
        {
            field: 'uPhoto',
            headerName: 'Photo',
            width: 60,
            renderCell: (params) => <Avatar src={params.row.uPhoto} />,
            sortable: false,
            filterable: false,
        },
        { field: 'uName', headerName: 'User Name', width: 170 },
        { field: 'uid', headerName: 'User ID', width: 220 },
        { field: 'daysOfStay', headerName: 'Days', width: 70, renderCell: (params) => params.row.daysOfStay.length + ' days' },
        { field: 'checkIn', headerName: 'Check-In', width: 170, renderCell: (params) => new Date(params.row.checkIn).toLocaleDateString('en-US', { month: 'long', day: '2-digit', year: 'numeric' }) },
        { field: 'checkOut', headerName: 'Check-Out', width: 170, renderCell: (params) => new Date(params.row.checkOut).toLocaleDateString('en-US', { month: 'long', day: '2-digit', year: 'numeric' }) },
        { field: 'amount', headerName: 'Price', width: 70, renderCell: (params) => '$' + params.row.amount },
        {
            field: 'createdAt',
            headerName: 'Booked On',
            width: 170,
            renderCell: (params) =>
                moment(params.row.createdAt).format('YYYY-MM-DD HH:MM:SS'),
        },

    ])

    const { state: { currentUser }, dispatch } = useValue();

    const [pageSize, setPageSize] = useState(5);
    const [homestays, setHomestays] = useState([]);
    const [selectedHomestay, setSelectedHomestay] = useState(null);
    const [homestayBookings, setHomestayBookings] = useState([]);

    useEffect(() => {
        setSelectedLink(link)

        const fetchData = async () => {
            const bookings = await getUserRooms(currentUser)
            setHomestays(bookings)

            if (bookings.length > 0) {
                setSelectedHomestay(bookings[0])
            }
        }

        fetchData()
    }, [])

    // const compare = (a, b) => {
    //     if(a.checkIn < b.checkIn) {
    //         return -1
    //     }
    //     else if(a.checkIn == b.checkIn) 
    //     {
    //         if(a.checkOut < b.checkOut) {
    //             return -1
    //         }
    //     }
    // }
    const compare = (a, b) => {
        if (a.checkIn < b.checkIn) {
            return -1;
        } else if (a.checkIn > b.checkIn) {
            return 1;
        } else { // a.checkIn === b.checkIn
            if (a.checkOut < b.checkOut) {
                return -1;
            } else if (a.checkOut > b.checkOut) {
                return 1;
            } else {
                return 0; // a.checkIn === b.checkIn and a.checkOut === b.checkOut
            }
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            if (!selectedHomestay) return

            setHomestayBookings([])
            dispatch({ type: 'START_LOADING' })
            const bookings = await getHomestayBookings(selectedHomestay?._id, currentUser?.token)

            if (bookings)
                setHomestayBookings(bookings.sort(compare))

            dispatch({ type: 'END_LOADING' })
        }

        fetchData()
    }, [selectedHomestay])

    // useEffect(() => {
    //     console.log(homestays);
    // }, [homestays])

    return (
        <>
            <Box
                sx={{
                    height: 600,
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Typography
                    variant="h3"
                    component="h3"
                    sx={{ textAlign: 'center', mt: 3, mb: 3 }}
                >
                    Hosted Reservations
                </Typography>

                <HomestayDropdown
                    homestays={homestays}
                    selectedHomestay={selectedHomestay}
                    setSelectedHomestay={(homestay) => setSelectedHomestay(homestay)}
                />

                <DataGrid
                    columns={columns}
                    rows={selectedHomestay ? homestayBookings : []}
                    getRowId={(row) => row._id}
                    rowsPerPageOptions={[5, 10, 20]}
                    pageSize={pageSize}
                    onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                    getRowSpacing={(params) => ({
                        top: params.isFirstVisible ? 0 : 5,
                        bottom: params.isLastVisible ? 0 : 5,
                    })}
                    sx={{
                        width: '100%',
                        marginTop: 3,
                        [`& .${gridClasses.row}`]: {
                            bgcolor: (theme) =>
                                theme.palette.mode === 'light' ? grey[200] : grey[900],
                        },
                    }}
                />
            </Box>
        </>
    )
}

export default HostedReservations