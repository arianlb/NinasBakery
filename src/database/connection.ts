import mongoose from 'mongoose';

const dbConnection = async () => {
    try {
        const connectionString = process.env.NODE_ENV === 'test' ? process.env.MONGODB_CNN_TEST : process.env.MONGODB_CNN;

        await mongoose.connect(connectionString || '');
        console.log('Database online');
    } catch (error) {
        throw new Error('Error connecting to database');
    }
}

export default dbConnection;