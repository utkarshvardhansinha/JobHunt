import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

mongoose.set('strictQuery', false);

const connectDB = async() => {
  try {
    const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
    console.log(`MongoDB connected successfully!: ${connectionInstance.connection.host}`);
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
     process.exit(1);
  }
}

export { connectDB };
