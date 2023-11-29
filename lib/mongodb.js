import mongoose from 'mongoose'

async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_DB_URI)
    console.log(process.env.MONGO_DB_URI)
    console.log('Connected to DB')
  } catch (error) {
    console.log(error)
  }
}

export default connectDB