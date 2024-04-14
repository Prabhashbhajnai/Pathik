import { useEffect, useState } from "react"
import { useLocation, useSearchParams } from "react-router-dom"
import BorderColorIcon from '@mui/icons-material/BorderColor';
import Calendar from 'react-calendar'
import { Button, Tooltip } from "@mui/material";

// Styles
import 'react-calendar/dist/Calendar.css'

// Context
import { useValue } from "../context/ContextProvider"

// actions
import { createBooking, updateBooking } from "../actions/booking"

const url = import.meta.env.VITE_SERVER_URL + '/booking'

const Booking = () => {
    const location = useLocation()
    const { state: { currentUser }, dispatch } = useValue()

    if (!location.state) return window.location.replace('/')


    const [isBooking, setIsBooking] = useState(true)

    let { daysOfStay, room, place } = location.state

    const [searchParams] = useSearchParams()
    const newBooking = searchParams.get('newbooking')

    const [isEditing, setIsEditing] = useState(false)
    const [blackoutDates, setBlackoutDates] = useState([])
    const [daysBooked, setDaysBooked] = useState(daysOfStay || room.daysOfStay)

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

    const handleNewDates = () => {
        setDaysBooked(getDates(daysBooked[0], daysBooked[1]))
        setIsEditing(false)
    }

    const completeBooking = async () => {
        const booking = {
            roomId: room.roomId || room._id,
            title: room.title,
            location: place.place_name,
            roomImg: room.images[0],
            price: room.price,
            checkIn: daysBooked[0],
            checkOut: daysBooked[daysBooked.length - 1],
            amount: room.price * daysBooked.length,
            daysOfStay: daysBooked,
            roomsAvailable: room.roomsAvailable
        }

        const result = await createBooking(booking, currentUser, dispatch)
        if (result)
            setIsBooking(false)
    }

    const handleUpdate = async () => {
        const booking = {
            _id: room.bookingId,
            roomId: room.roomId || room._id,
            title: room.title,
            location: room.location,
            roomImg: room.roomImg,
            checkIn: daysBooked[0],
            checkOut: daysBooked[daysBooked.length - 1],
            amount: room.price * daysBooked.length,
            daysOfStay: daysBooked,
            roomsAvailable: room.roomsAvailable
        }

        const result = await updateBooking(booking, currentUser.token, dispatch)
        if (result)
            setIsBooking(false)
    }

    useEffect(() => {
        const getBlackoutDates = async () => {
            try {
                const data = await fetch(`${url}/${room._id || room.roomId}`)
                const res = await data.json()
                let dateCounts = {}

                if (res) {
                    res.result.forEach(booking => {
                        booking.daysOfStay.forEach(day => {
                            dateCounts[day] = (dateCounts[day] || 0) + 1
                        })
                    })
                    if (room.daysOfStay)
                        room.daysOfStay.forEach(day => {
                            dateCounts[day] = (dateCounts[day] || 0) - 1
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

        getBlackoutDates()
    }, [])

    return (
        <>
            <div className="w-full h-screen">
                <nav className="flex justify-center w-full py-5">
                    <h1 className="text-4xl font-bold">
                        Booking Details
                    </h1>
                </nav>

                <div className="flex flex-col gap-5 justify-center items-center pt-10 px-3">
                    {/* Customer Name */}
                    <div className="flex items-center w-full md:w-1/2">
                        <h1 className="text-xl w-1/2 font-bold">Customer Name:</h1>
                        <h1 className="text-xl w-1/2">{currentUser?.name}</h1>
                    </div>

                    {/* Homestay Details */}
                    {/* Homestay name */}
                    <div className="flex items-center w-full md:w-1/2">
                        <h1 className="text-xl w-1/2 font-bold">Homestay Name:</h1>
                        <h1 className="text-xl w-1/2">{room?.title}</h1>
                    </div>
                    {/* Homestay address */}
                    <div className="flex w-full md:w-1/2">
                        <h1 className="text-xl w-1/2 font-bold">Homestay Address:</h1>
                        <h1 className="text-xl w-1/2">{place?.place_name || room?.location}</h1>
                    </div>
                    {/* Rooms Available */}
                    <div className="flex items-center w-full md:w-1/2">
                        <h1 className="text-xl w-1/2 font-bold">Rooms Available:</h1>
                        <h1 className="text-xl w-1/2">{room?.roomsAvailable}</h1>
                    </div>

                    {/* Days Booked */}
                    <div className="flex w-full md:w-1/2">
                        <h1 className="text-xl w-1/2 font-bold">Booked For:</h1>
                        <div className="flex flex-col gap-3 w-1/2">
                            <div className="flex justify-between items-center relative">
                                <h1 className="text-xl">{daysBooked.length} days</h1>

                                {/* Edit booking dates */}
                                {isBooking &&
                                    <div>
                                        <Tooltip title='Edit Dates'>
                                            <BorderColorIcon onClick={() => setIsEditing(prev => !prev)} className="text-slate-500 cursor-pointer" />
                                        </Tooltip>
                                        {isEditing && <div style={{ position: 'absolute', top: '40px', left: '0' }}>
                                            <Calendar
                                                selectRange={true}
                                                onChange={(value) => setDaysBooked(value)}
                                                tileDisabled={({ date }) => blackoutDates.includes(date.getDate())}
                                                minDate={new Date()}
                                                onClickDay={(value) => setDaysBooked([value, value])}
                                            />

                                            <div className='flex'>
                                                <Button className='flex justify-end w-full' onClick={() => setIsEditing(false)}>Cancel</Button>
                                                <Button className='flex justify-end w-full' onClick={handleNewDates}>Ok</Button>
                                            </div>

                                        </div>}
                                    </div>
                                }
                            </div>
                            <div className="overflow-y-scroll h-32">
                                {daysBooked.map((days, index) => (
                                    <h1 key={index} className="text-xl">{new Date(days).toLocaleDateString('en-US', { month: 'long', day: '2-digit', year: 'numeric' })}</h1>
                                ))}
                            </div>

                        </div>
                    </div>

                    {/* Price */}
                    <div className="flex items-center w-full md:w-1/2">
                        <h1 className="text-xl w-1/2 font-bold">Total Price:</h1>
                        <h1 className="text-xl w-1/2">$ {room?.price * daysBooked?.length}/-</h1>
                    </div>
                    {isBooking ?
                        (newBooking === 'true' ? (
                            <div className="flex justify-between mt-5 w-1/2">
                                <button className="border-2 px-4 py-1 rounded-md" onClick={() => window.location.replace('/')}>Cancel</button>
                                <button className="border-2 px-4 py-1 rounded-md bg-blue-500 text-white" onClick={completeBooking}>Proceed</button>
                            </div>
                        ) : (
                            <div className="flex justify-between mt-5 w-1/2">
                                <button className="border-2 px-4 py-1 rounded-md" onClick={() => window.location.replace('/dashboard/mybookings')}>Cancel</button>
                                <button className="border-2 px-4 py-1 rounded-md bg-blue-500 text-white" onClick={handleUpdate}>Update</button>
                            </div>

                        )
                        ) : (newBooking === 'true' ? (
                                <button className="border-2 px-4 py-1 rounded-md bg-blue-500 text-white" onClick={() => window.location.replace('/')}>Done</button>
                            ) : (
                                <button className="border-2 px-4 py-1 rounded-md bg-blue-500 text-white" onClick={() => window.location.replace('/dashboard/mybookings')}>Done</button>
                            )
                        )
                    }
                </div>

            </div>
        </>
    )
}

export default Booking