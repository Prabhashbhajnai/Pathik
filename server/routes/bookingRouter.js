import { Router } from "express"

// Controllers
import { createBooking, deleteBooking, getBookings, getUserBookings, updateBooking } from '../controllers/booking.js'

// Midddleware
import auth from "../middleware/auth.js";

const bookingRouter = Router()

bookingRouter.post('/', auth, createBooking)
bookingRouter.get('/:id', getBookings)
bookingRouter.get('/user/:id', getUserBookings)
bookingRouter.delete('/:id', auth, deleteBooking)
bookingRouter.patch('/:id', auth, updateBooking)

export default bookingRouter