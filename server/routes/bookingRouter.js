import { Router } from "express"

// Controllers
import { createBooking, getBookings, getUserBookings } from '../controllers/booking.js'

// Midddleware
import auth from "../middleware/auth.js";

const bookingRouter = Router()

bookingRouter.post('/', auth, createBooking)
bookingRouter.get('/:id', getBookings)
bookingRouter.get('/user/:id', getUserBookings)

export default bookingRouter