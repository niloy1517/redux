import bcrypt from "bcryptjs";
import validator from 'validator'
import jwt from 'jsonwebtoken'
import userModel from "../models/userModel.js";

const userRegistration = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        if (!name || !email || !password) {
            return res.status(404).json({ success: false, message: 'All field are required' })
        }

        if (password.length < 6) {
            return res.status(400).json({ success: false, message: 'Please enter strong password' })
        }

        if (!validator.isEmail(email)) {
            return res.status(400).json({ success: false, message: 'Please enter vaild email' })
        }

        const password_hash = await bcrypt.hash(password, 15)

        const user = await userModel.create({ name, email, password: password_hash })

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7D' })

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
            maxAge: 7 * 24 * 60 * 60 * 1000
        })

        res.status(201).json({ success: true, message: 'Registration successful' })
    } catch (error) {
        if (error.code == 11000) {
            res.status(400).json({
                success: false,
                message: 'User already exist'
            })
        }
        res.status(500).json({ success: false, message: 'Somethin went wrong' })
    }
}



const userLogin = async (req, res) => {
    const { email, password } = req.body;
    try {
        if (!email || !password) {
            return res.status(404).json({ success: false, message: 'All field are required' })
        }

        const user = await userModel.findOne({ email })

        if (!user && !validator.isEmail(email)) {
            return res.status(400).json({ success: false, message: 'Please enter vaild email' })
        }

        const password_match = await bcrypt.compare(password, user.password)

        if (!password_match) {
            return res.status(400).json({ success: false, message: 'Please enter vaild password' })
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7D' })

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
            maxAge: 7 * 24 * 60 * 60 * 1000
        })

        res.status(200).json({ success: true, message: 'Login successful', data: {name: user.name, email: user.email} })
    } catch (error) {
        res.status(500).json({ success: false, message: 'Somethin went wrong' })
    }
}


export { userRegistration, userLogin }