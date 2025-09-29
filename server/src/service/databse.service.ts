import mongoose from 'mongoose';

// TODO: add username and password for database
const mongoDBUrl = 'mongodb://mongo:27017/pawgressDB';

// connect mongodb to server
export const connectDB = async () => {
  try {
    await mongoose.connect(mongoDBUrl);
    console.log('Connected to MongoDB successfully.');
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  }
};

