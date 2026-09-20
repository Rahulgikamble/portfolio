import mongoose from 'mongoose';

// IMPORTANT for serverless: caches the CONNECTION PROMISE itself (not just
// a boolean), so if multiple requests arrive at nearly the same time
// before the first connection finishes, they all await the same in-flight
// connect() call instead of each triggering their own — avoiding both
// wasted connections and the race condition where a not-yet-ready
// connection object gets logged/used too early.
let cachedConnection = null;

const connectDB = async () => {
  if (mongoose.connection.readyState === 1) return mongoose.connection;

  if (!cachedConnection) {
    cachedConnection = mongoose
      .connect(process.env.MONGO_URI)
      .then((conn) => {
        console.log(`MongoDB Connected: ${conn.connection.host}`);
        return conn;
      })
      .catch((error) => {
        cachedConnection = null; // allow a retry on the next call instead of staying stuck
        console.error(`MongoDB connection error: ${error.message}`);
        if (!process.env.VERCEL) process.exit(1);
        throw error;
      });
  }

  return cachedConnection;
};

export default connectDB;
