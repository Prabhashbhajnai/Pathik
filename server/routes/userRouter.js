import { Router } from "express"

// Controllers
import { register } from "../controllers/user.js"

const userRouter = Router()

userRouter.post('/register', register)

export default userRouter