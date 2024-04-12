import Booking from "../models/Bookings.js"
import tryCatch from "./utils/tryCatch.js"

// Create a new booking
export const createBooking = tryCatch(async (req, res) => {
    const { id: uid, name: uName, email: uEmail, photoUrl: uPhoto } = req.user;
    const newBooking = await Booking.create({ ...req.body, uid, uName, uEmail, uPhoto });

    return res.status(201).json({ success: true, result: newBooking });
});