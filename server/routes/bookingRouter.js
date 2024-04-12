import { Router } from "express"

// Controllers
import { createBooking } from '../controllers/booking.js'

// Midddleware
import auth from "../middleware/auth.js";

const bookingRouter = Router()

bookingRouter.post('/', auth, createBooking)

export default bookingRouter