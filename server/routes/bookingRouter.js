import { Router } from "express"

// Controllers
import { createBooking, deleteBooking, getBookings, getUserBookings } from '../controllers/booking.js'

// Midddleware
import auth from "../middleware/auth.js";

const bookingRouter = Router()

bookingRouter.post('/', auth, createBooking)
bookingRouter.get('/:id', getBookings)
bookingRouter.get('/user/:id', getUserBookings)
bookingRouter.delete('/:id', auth, deleteBooking)

export default bookingRouter