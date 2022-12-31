import mongoose from "mongoose";

const connectMongo = async (): Promise<void> => {
  const MONGO_URI = process.env.MONGO_URI;
  if (!MONGO_URI) {
    throw new Error(
      "Please define the MONGODB_URI environment variable inside .env.local"
    );
  }
  if (mongoose.connections[0].readyState) {
    console.log("Connected already");
  } else {
    mongoose.connect(process.env.MONGO_URI!, () => {
      console.log("Connected");
    });
  }
};
export default connectMongo;
