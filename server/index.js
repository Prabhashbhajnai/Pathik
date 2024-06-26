import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'

// Microservise routes
import roomRouter from './routes/roomRouter.js'
import userRouter from './routes/userRouter.js'
import bookingRouter from './routes/bookingRouter.js'

dotenv.config()

const port = process.env.PORT || 5000

const app = express()

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', process.env.CLIENT_URL)
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE')
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Authorization');
    next()
})

// Middleware
// To avoid dos attack
app.use(express.json({ limit: '10mb' }))

// Application Routes
app.use('/room', roomRouter)
app.use('/user', userRouter)
app.use('/booking', bookingRouter)

app.get('/', (req, res) => res.json({ message: 'Welcome to the server' }))
app.use((req, res) => res.status(404).json({ success: false, message: 'Not Found' }));


const startServer = async () => {
    try {
        await mongoose.connect(process.env.MONGO_CONNECT)
        app.listen(port, () => console.log(`Server is listening on port ${port}`))
    } catch (error) {
        console.log(error)
    }
}

startServer()