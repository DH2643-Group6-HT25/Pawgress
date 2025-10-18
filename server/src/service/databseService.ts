import mongoose from 'mongoose'

const mongoDBUrl = `mongodb://${process.env.MONGO_INITDB_ROOT_USERNAME}:${process.env.MONGO_INITDB_ROOT_PASSWORD}@${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_DB}?authSource=admin`

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
