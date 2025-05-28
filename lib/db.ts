import mongoose from "mongoose";
const MONGO_URI = process.env.MONGO_URI!;

if (!MONGO_URI) {
  throw new Error(
    "Please define the MONGO_URI environment variable inside .env.local"
  );
}
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { connection: null, promise: null };
}

export async function dbConnect() {
  if (cached.connection) {
    return cached.connection;
  }
  if (!cached.promise) {
    const opts = {
      bufferCommands: true,
      maxPoolSize: 10,
    };

    cached.promise = mongoose
      .connect(MONGO_URI, opts)
      .then(() => mongoose.connection);
  }
  try {
    cached.connection = await cached.promise;
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error); // 🔥 LOG IT
    cached.promise = null;
    throw new Error("Failed to connect to MongoDB");
  }
  return cached.connection;
}
