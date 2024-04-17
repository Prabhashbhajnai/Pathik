import { Router } from "express"

// Controllers
import { createBooking, deleteBooking, getBookings, getUserBookings, updateBooking } from '../controllers/booking.js'

// Midddleware
import auth from "../middleware/auth.js";

const bookingRouter = Router()

bookingRouter.post('/', auth, createBooking)        // create a new booking
bookingRouter.get('/homestay/:id', auth, getBookings)     // get all bookings for a homestay
bookingRouter.get('/user/:id', getUserBookings)     // get all bookings for a user
bookingRouter.delete('/:id', auth, deleteBooking)   // delete a booking
bookingRouter.patch('/:id', auth, updateBooking)    // update a booking

export default bookingRouter