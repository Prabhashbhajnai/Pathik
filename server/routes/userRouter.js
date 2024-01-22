import { Router } from "express"
import auth from '../middleware/auth.js';

// Controllers
import { login, register, updateProfile } from "../controllers/user.js"

const userRouter = Router()

userRouter.post('/register', register)
userRouter.post('/login', login)
userRouter.patch('/updateProfile',auth, updateProfile);

export default userRouter