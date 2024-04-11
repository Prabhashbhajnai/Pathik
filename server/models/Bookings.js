import mongoose from "mongoose"

const bookingSchema = mongoose.Schema(
    {
        roomId: { type: ObjectId, required: true },
        uid: { type: ObjectId, required: true },
        uName: { type: String, required: true },
        uEmail: { type: String, required: true },
        uPhoto: { type: String, required: true},
        checkIn: { type: Date, required: true },
        checkOut: { type: Date, required: true },
        amount: { type: Number, required: true },
        daysOfStay: {type: Array, required: true},
        paymentInfo: {
            id: { type: String },
            status: { type: String },
        },
        paidAt: { type: Date },
        createdAt: { type: Date, default: Date.now },
    }
)

const Booking = mongoose.model('Booking', bookingSchema)

export default Booking