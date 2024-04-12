import { useState } from "react"
import { useLocation } from "react-router-dom"

// Context
import { useValue } from "../context/ContextProvider"

// actions
import { createBooking } from "../actions/booking"

const Booking = () => {
    const location = useLocation()
    const { state: { currentUser }, dispatch } = useValue()

    if (!location.state) return window.location.replace('/')

    const [isBooking, setIsBooking] = useState(true)

    const { dates, room, place } = location.state
    console.log(room);

    const completeBooking = async () => {
        const booking = {
            roomId: room.roomId || room._id,
            title: room.title,
            location: place.place_name,
            roomImg: room.images[0],
            checkIn: dates[0],
            checkOut: dates[dates.length - 1],
            amount: room.price * dates.length,
            daysOfStay: dates
        }

        const result = await createBooking(booking, currentUser, dispatch)
        if (result)
            setIsBooking(false)
    }

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
                        <h1 className="text-xl w-1/2">{place?.place_name}</h1>
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
                            <h1 className="text-xl">{dates.length} days</h1>
                            <div className="overflow-y-scroll h-32">
                                {dates.map((days, index) => (
                                    <h1 key={index} className="text-xl">{days.toLocaleDateString('en-US', { month: 'long', day: '2-digit', year: 'numeric' })}</h1>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Price */}
                    <div className="flex items-center w-full md:w-1/2">
                        <h1 className="text-xl w-1/2 font-bold">Total Price:</h1>
                        <h1 className="text-xl w-1/2">₹ {room?.price * dates.length}/-</h1>
                    </div>
                    {isBooking ?
                        (
                            <div className="flex justify-between mt-5 w-1/2">
                                <button className="border-2 px-4 py-1 rounded-md" onClick={() => window.location.replace('/')}>Cancel</button>
                                <button className="border-2 px-4 py-1 rounded-md bg-blue-500 text-white" onClick={completeBooking}>Proceed</button>
                            </div>
                        ) : (
                            <button className="border-2 px-4 py-1 rounded-md bg-blue-500 text-white" onClick={() => window.location.replace('/')}>Done</button>
                        )
                    }
                </div>

            </div>
        </>
    )
}

export default Booking