import mongoose from "mongoose"

const bookingSchema = mongoose.Schema(
    {
        roomId: { type: String, required: true },
        title: { type: String, required: true },
        roomImg: { type: String, required: true },
        location: { type: String, required: true },
        uid: { type: String, required: true },
        uName: { type: String, required: true },
        uPhoto: { type: String, required: true},
        checkIn: { type: Date, required: true },
        checkOut: { type: Date, required: true },
        amount: { type: Number, required: true },
        daysOfStay: {type: Array, required: true},
        createdAt: { type: Date, default: Date.now },
    }
)

const Booking = mongoose.model('Booking', bookingSchema)

export default Booking