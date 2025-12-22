import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const dbURI = 'mongodb://127.0.0.1:27017/semiconductor'; // Local MongoDB URI
    await mongoose.connect(dbURI)
    console.log('MongoDB connected successfully to the semiconductor database');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1); // Exit process with failure
  }
};

export default connectDB;