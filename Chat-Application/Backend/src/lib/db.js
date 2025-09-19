import mongoose from 'mongoose';

export const connectDB = async () => {

    const uri = process.env.MONGODB_URI

    try {
        const conn = await mongoose.connect(uri);
        console.log(`MongoDB connection established:${conn.connection.host}`);

    } catch (error) {
        console.error(error.message);
        process.exit(1);
    }
};
