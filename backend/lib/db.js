import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export const connectDB = async () => {
	try {
		const conn = await mongoose.connect(process.env.MONGODB_URI);
		console.log(`MongoDB connected:  ${conn.connection.host}` );
	} catch (error) {
		console.error(`Error connecting to MONGODB: ${error.message}` );
		process.exit(1); // 1 means there was an error, 0 means success
	}
};
