import { Router } from "express"

// Controllers
import { createRoom } from "../controllers/room.js"

// Middleware
import auth from "../middleware/auth.js";

const roomRouter = Router()

roomRouter.post('/', auth, createRoom);

export default roomRouter;