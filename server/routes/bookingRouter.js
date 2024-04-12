import { Router } from "express"

// Controllers
import { createBooking, getBookings } from '../controllers/booking.js'

// Midddleware
import auth from "../middleware/auth.js";

const bookingRouter = Router()

bookingRouter.post('/', auth, createBooking)
bookingRouter.get('/:id', getBookings)

export default bookingRouter