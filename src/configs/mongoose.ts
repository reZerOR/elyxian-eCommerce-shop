import mongoose from 'mongoose';

let isConnected = false; // Track the connection status

export async function connectToDatabase() {
  if (isConnected) {
    return mongoose.connection;
  }

  try {
    const db = await mongoose.connect(process.env.MONGODB_URI!);

    isConnected = db.connections[0].readyState === 1;
    console.log("Connected to MongoDB");

    return db;
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw new Error("Failed to connect to MongoDB");
  }
}