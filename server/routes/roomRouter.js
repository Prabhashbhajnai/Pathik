import { Router } from "express"

// Controllers
import { createRoom, getRooms } from "../controllers/room.js"

// Middleware
import auth from "../middleware/auth.js";

const roomRouter = Router()

roomRouter.post('/', auth, createRoom);
roomRouter.get('/', getRooms);

export default roomRouter;