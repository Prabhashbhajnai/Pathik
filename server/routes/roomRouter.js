import { Router } from "express"

// Controllers
import { createRoom, deleteRooms, getRooms, updateRooms } from "../controllers/room.js"

// Middleware
import auth from "../middleware/auth.js";
import checkAccess from "../middleware/checkAccess.js";
import roomPermissions from "../middleware/permissions/room/roomPermission.js";

const roomRouter = Router()

roomRouter.post('/', auth, createRoom);
roomRouter.get('/', getRooms);
roomRouter.delete('/:roomId',auth,checkAccess(roomPermissions.delete), deleteRooms);
roomRouter.patch('/:roomId', auth,checkAccess(roomPermissions.update),updateRooms);
export default roomRouter;