import Booking from "../models/Bookings.js"
import tryCatch from "./utils/tryCatch.js"

// Create a new booking
export const createBooking = tryCatch(async (req, res) => {
    const { id: uid, name: uName, email: uEmail, photoUrl: uPhoto } = req.user;
    const newBooking = await Booking.create({ ...req.body, uid, uName, uEmail, uPhoto });

    return res.status(201).json({ success: true, result: newBooking });
});

// get all booking for a homestay
export const getBookings = tryCatch(async (req, res) => {
    const bookings = await Booking.find({ roomId: req.params.id });

    return res.status(200).json({ success: true, result: bookings });
})

// get all booking for a user
export const getUserBookings = tryCatch(async (req, res) => {
    const bookings = await Booking.find({ uid: req.params.id });

    return res.status(200).json({ success: true, result: bookings });
})

// delete a booking
export const deleteBooking = tryCatch(async (req, res) => {
    const { id } = req.params

    const deleteBooking = await Booking.findOneAndDelete({ _id: id })

    if (!deleteBooking) {
        return res.status(404).json({ success: false, message: 'No booking found with this ID' })
    }

    return res.status(200).json({ success: true, result: deleteBooking })
})

// update a booking
export const updateBooking = tryCatch(async (req, res) => {
    const { id } = req.params

    const updatedBooking = await Booking.findOneAndUpdate({ _id: id }, {
        ...req.body
    }, { new: true })

    if (!updatedBooking) {
        return res.status(404).json({ success: false, message: 'No booking found with this ID' })
    }

    return res.status(200).json({ success: true, result: updatedBooking })
})