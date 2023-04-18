import mongoose from 'mongoose';

const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_CNN || 'mongodb://localhost:27017/ninas');
        console.log('Database online');
    } catch (error) {
        throw new Error('Error connecting to database');
    }
}

export default dbConnection;