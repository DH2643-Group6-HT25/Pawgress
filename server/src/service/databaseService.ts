import mongoose from 'mongoose'

const env = process.env?.NODE_ENV || 'development'

const mongoDBUrl =
  env == 'production'
    ? `mongodb+srv://${process.env.MONGO_INITDB_ROOT_USERNAME}:${process.env.MONGO_INITDB_ROOT_PASSWORD}@${process.env.MONGO_HOST}/?retryWrites=true&w=majority&appName=${process.env.MONGO_APP}`
    : `mongodb://${process.env.MONGO_INITDB_ROOT_USERNAME}:${process.env.MONGO_INITDB_ROOT_PASSWORD}@${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_DB}?authSource=admin`

// connect mongodb to server
export const connectDB = async () => {
  try {
    await mongoose.connect(mongoDBUrl)
  } catch (err) {
    console.error('MongoDB connection error:', err)
    process.exit(1)
  }
}
