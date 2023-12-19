// For testing purpose only
export const createRoom = async (req, res) => {
    // testing resource access
    res.status(200).json({ success: true, result: { id: 123, title: 'test room' } })
}