import mongoose from "mongoose";

const connectMongo = async (): Promise<void> => {
  try {
    mongoose.set("strictQuery", true);
    const { connection } = await mongoose.connect(process.env.MONGO_URI!);

    if (connection.readyState == 1) {
      console.log("Database connection established");
    }
  } catch (errors) {
    return console.error(errors);
  }
};
export default connectMongo;
