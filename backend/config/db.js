import mongoose from "mongoose"

const dbConnection = async () => {
    const URL = process.env.MONGO_URL;
    try {
        if(!URL) {
            console.log('mongodb connection string not found')
        }
        
        await mongoose.connect(URL);
        console.log('Database connection successful')
    } catch (error) {
        console.log('Database connection failed', error)
    }
}

export default dbConnection