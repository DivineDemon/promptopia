import mongoose from "mongoose";

let isConnected = false;

export const connectDB = async () => {
  try {
    mongoose.set("strictQuery", false);
    if (isConnected) {
      console.log("MongoDB Already Connected!");
    } else {
      const response = await mongoose.connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log(`MongoDB Connected: ${response.connection.host}:${response.connection.port}`);
    }
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};