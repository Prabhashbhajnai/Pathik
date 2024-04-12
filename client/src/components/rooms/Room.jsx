import {
    AppBar,
    Avatar,
    Box,
    Button,
    Container,
    Dialog,
    IconButton,
    Rating,
    Slide,
    Stack,
    Toolbar,
    Tooltip,
    Typography,
} from '@mui/material';
import { forwardRef, useEffect, useState } from 'react';
import { useValue } from '../../context/ContextProvider';
import { Close, StarBorder } from '@mui/icons-material';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay, EffectCoverflow, Lazy, Zoom } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/effect-coverflow';
import 'swiper/css/lazy';
import 'swiper/css/zoom';
import './swiper.css';

import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'

import { useNavigate } from 'react-router-dom';

const url = import.meta.env.VITE_SERVER_URL + '/booking'

const Transition = forwardRef((props, ref) => {
    return <Slide direction="up" {...props} ref={ref} />;
});

const Room = () => {
    const { state: { room }, dispatch } = useValue();

    const [place, setPlace] = useState(null);

    const [booking, setBooking] = useState(false)

    const [daysBooked, setDaysBooked] = useState([]) // [date1, date2, date3, ...
    const [blackoutDates, setBlackoutDates] = useState([])

    const navigate = useNavigate()

    const getBlackoutDates = async () => {
        try {
            const data = await fetch(`${url}/${room._id}`)
            const res = await data.json()
            var dateCounts = {}

            if (res) {
                res.result.forEach(booking => {
                    booking.daysOfStay.forEach(day => {
                        dateCounts[day] = (dateCounts[day] || 0) + 1
                    })
                })
            }
            
            // convert object to array and filter dates that are fully booked
            dateCounts = Object.entries(dateCounts).filter(([date, count]) => count >= room.roomsAvailable);

            // set blackout dates
            setBlackoutDates(dateCounts.map(([date, count]) => new Date(date).getDate()))
        } catch (error) {
            console.log(error);
        }
    }

    // Fetch place details
    useEffect(() => {
        if (room) {
            const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${room.lng},${room.lat}.json?access_token=${import.meta.env.VITE_REACT_APP_MAP_TOKEN}`;
            fetch(url)
                .then((response) => response.json())
                .then((data) => setPlace(data.features[0]));

            getBlackoutDates()
        }
    }, [room]);

    const handleClose = () => {
        setBooking(false)
        dispatch({ type: 'UPDATE_ROOM', payload: null });
    };

    // Custom method to add days to date object
    Date.prototype.addDays = function (days) {
        var dat = new Date(this.valueOf()) // create new date object with current date
        dat.setDate(dat.getDate() + days); // add days to date object
        return dat; // return new date object
    }

    // Get dates between two dates
    const getDates = (startDate, stopDate) => {
        var dateArray = new Array();
        var currentDate = startDate;
        while (currentDate <= stopDate) {
            dateArray.push(currentDate)
            currentDate = currentDate.addDays(1);
        }

        return dateArray;
    }

    const handleBook = () => {
        const dates = getDates(daysBooked[0], daysBooked[1])
        handleClose()
        navigate('/booking', { state: { dates, room, place } })
    }

    return (
        <Dialog
            fullScreen
            open={Boolean(room)}
            onClose={handleClose}
            TransitionComponent={Transition}
        >
            <AppBar position="relative">
                <Toolbar>
                    <Typography variant="h6" component="h3" sx={{ ml: 2, flex: 1 }}>
                        {room?.title}
                    </Typography>
                    <IconButton color="inherit" onClick={handleClose}>
                        <Close />
                    </IconButton>
                </Toolbar>
            </AppBar>
            <Container sx={{ pt: 5 }}>
                <Swiper
                    modules={[Navigation, Autoplay, EffectCoverflow, Lazy, Zoom]}
                    centeredSlides
                    slidesPerView={2}
                    grabCursor
                    navigation
                    autoplay
                    lazy
                    zoom
                    effect="coverflow"
                    coverflowEffect={{
                        rotate: 50,
                        stretch: 0,
                        depth: 100,
                        modifier: 1,
                        slideShadows: true,
                    }}
                >
                    {room?.images?.map((url) => (
                        <SwiperSlide key={url}>
                            <div className="swiper-zoom-container">
                                <img src={url} alt="room" />
                            </div>
                        </SwiperSlide>
                    ))}
                    <Tooltip
                        title={room?.uName || ''}
                        sx={{
                            position: 'absolute',
                            bottom: '8px',
                            left: '8px',
                            zIndex: 2,
                        }}
                    >
                        <Avatar src={room?.uPhoto} />
                    </Tooltip>
                </Swiper>
                <Stack sx={{ p: 3 }} spacing={2}>
                    <Stack
                        direction="row"
                        sx={{
                            justifyContent: 'space-between',
                            flexWrap: 'wrap',
                        }}
                    >
                        <Box>
                            <Typography variant="h6" component="span">
                                {'Price Per Night: '}
                            </Typography>
                            <Typography component="span">
                                {room?.price === 0 ? 'Free Stay' : '$' + room?.price}
                            </Typography>
                        </Box>
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '2rem',
                            }}
                        >

                            {/* Booking button */}
                            <div style={{ position: 'relative' }}>
                                <Button variant='contained' onClick={() => setBooking(prev => (!prev))}>Book Now</Button>
                                {booking && (
                                    <div style={{ position: 'absolute', top: '50px', left: '0' }}>
                                        <Calendar
                                            selectRange={true}
                                            onChange={(value) => setDaysBooked(value)}
                                            tileDisabled={({ date }) => blackoutDates.includes(date.getDate())}
                                            minDate={new Date()}
                                            onClickDay={(value) => setDaysBooked([value, value])}
                                        />

                                        <div className='flex'>
                                            <Button className='flex justify-end w-full' onClick={() => setBooking(false)}>Cancel</Button>
                                            <Button className='flex justify-end w-full' onClick={handleBook}>Ok</Button>
                                        </div>

                                    </div>
                                )}
                            </div>

                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                }}
                            >
                                <Typography variant="h6" component="span">
                                    {'Ratings: '}
                                </Typography>
                                <Rating
                                    name="room-ratings"
                                    defaultValue={3.5}
                                    precision={0.5}
                                    emptyIcon={<StarBorder />}
                                />
                            </Box>
                        </Box>
                    </Stack>
                    <Stack
                        direction="row"
                        sx={{
                            justifyContent: 'space-between',
                            flexWrap: 'wrap',
                        }}
                    >
                        <Box>
                            <Typography variant="h6" component="span">
                                {'Place Name: '}
                            </Typography>
                            <Typography component="span">{place?.text}</Typography>
                        </Box>
                        <Box>
                            <Typography variant="h6" component="span">
                                {'Address: '}
                            </Typography>
                            <Typography component="span">{place?.place_name}</Typography>
                        </Box>
                    </Stack>
                    <Stack
                        direction="row"
                        sx={{
                            justifyContent: 'space-between',
                            flexWrap: 'wrap',
                        }}
                    >
                        <Box>
                            <Typography variant="h6" component="span">
                                {'Details: '}
                            </Typography>
                            <Typography component="span">{room?.description}</Typography>
                        </Box>
                        <Box>
                            <Typography variant="h6" component="span">
                                {'Rooms Available: '}
                            </Typography>
                            <Typography component="span">{room?.roomsAvailable}</Typography>
                        </Box>
                    </Stack>
                </Stack>
            </Container>
        </Dialog>
    );
};

export default Room;