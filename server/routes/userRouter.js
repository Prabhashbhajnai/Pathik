import { Router } from "express"

// Controllers
import { login, register } from "../controllers/user.js"

const userRouter = Router()

userRouter.post('/register', register)
userRouter.post('/login', login)

export default userRouter