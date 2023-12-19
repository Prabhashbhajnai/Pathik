import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

// Models
import User from '../models/User.js'

export const register = async (req, res) => {
    try {
        const { name, email, password } = req.body

        // check length of password
        if (password.length < 6)
            return res.status(400).json({ success: false, message: 'Password must be at least 6 characters' })

        // change email to lowercase
        const emailLowerCase = email.toLowerCase()

        // check if user exists
        const existingUser = await User.findOne({ emailLowerCase })

        if (existingUser)
            return res.status(400).json({ success: false, message: 'User already exists' })

        // hash password
        const hashedPassword = await bcrypt.hash(password, 12)

        // create user
        const user = await User.create({
            name,
            email: emailLowerCase,
            password: hashedPassword
        })

        // after user is created extracting id and photo to send back to client
        const { _id: id, photoUrl } = user

        // create token
        const token = jwt.sign(
            { 
                id, 
                name, 
                photoUrl 
            }, 
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        )

        res.status(201).json({success: true, result: { id, name, email, photoUrl, token }})
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'Something went wrong! Try again later' })
    }
}