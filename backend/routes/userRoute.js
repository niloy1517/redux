import express from 'express'
import { userLogin, userRegistration } from '../controllers/userController.js';

const userRoute = express.Router();

userRoute.post('/registration', userRegistration)
userRoute.post('/login', userLogin)

export default userRoute