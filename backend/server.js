import express from 'express'
import dotenv from 'dotenv'
import dbConnection from './config/db.js';
import userRoute from './routes/userRoute.js';
import cors from 'cors'
import cookieParser from 'cookie-parser';

dotenv.config()

const allowedOrigins = [
    'http://localhost:5173',
    'https://redux-frontend-t186.onrender.com',
    'https://redux-frontend-t186.onrender.com/'
]

const app = express()
const PORT = process.env.PORT || 3000;

//MONGODB CONNECTION
dbConnection()

app.use(cors({
    origin: allowedOrigins,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"]
}))

app.use(cookieParser());
app.use(express.json())

app.use(express.urlencoded({extended: true}))

app.use('/api/user', userRoute)

app.get('/', (req, res) => {
    res.json('this is home route')
})

app.listen(PORT, () => {
    console.log(`server running at http://localhost:${PORT}`)
})