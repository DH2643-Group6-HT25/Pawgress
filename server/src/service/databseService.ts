import mongoose from 'mongoose'

const mongoDBUrl =
  'mongodb://pawgress-admin:pwd123456@mongo:27017/pawgressDB?authSource=admin'

// connect mongodb to server
export const connectDB = async () => {
  try {
    await mongoose.connect(mongoDBUrl)
    console.log('Connected to MongoDB successfully.')
  } catch (err) {
    console.error('MongoDB connection error:', err)
    process.exit(1)
  }
}
