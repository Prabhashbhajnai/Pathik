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

const HostedReservations = ({ setSelectedLink, link }) => {
    const { state: { currentUser } } = useValue();

    const [pageSize, setPageSize] = useState(5);
    const [homestays, setHomestays] = useState([]);
    const [selectedHomestay, setSelectedHomestay] = useState(null);

    useEffect(() => {
        setSelectedLink(link)

        const fetchData = async () => {
            const bookings = await getUserRooms(currentUser)
            setHomestays(bookings)

            if(bookings.length > 0) {
                setSelectedHomestay(bookings[0])
            }
        }

        fetchData()
    }, [])

    useEffect(() => {
        console.log(homestays);
    }, [homestays])

    return (
        <>
            <Box
                sx={{
                    height: 400,
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

            </Box>
        </>
    )
}

export default HostedReservations