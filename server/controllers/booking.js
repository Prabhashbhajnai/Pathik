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