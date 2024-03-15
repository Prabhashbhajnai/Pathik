import Room from '../models/Room.js';
import tryCatch from './utils/tryCatch.js';

export const createRoom = tryCatch(async (req, res) => {
  const { id: uid, name: uName, photoUrl: uPhoto } = req.user;
  const newRoom = new Room({ ...req.body, uid, uName, uPhoto });
  await newRoom.save();
  res.status(201).json({ success: true, result: newRoom });
});

export const getRooms = tryCatch(async (req, res) => {
  // sort room based on created time new to old
  const rooms = await Room.find().sort({_id: -1});
  res.status(200).json({ success: true, result: rooms });
});

export const deleteRooms = tryCatch(async (req, res)=>{
  const {_id} = await Room.findByIdAndDelete(req.params.roomId)
  res.status(200).json({ success:true, result:{_id}})
});
export const updateRooms = tryCatch(async (req, res)=>{
  const updateRoom = await Room.findByIdAndUpdate(req.params.roomId, req.body, {new:true})
  res.status(200).json({sucess:true, result:updateRoom})
})
