import mongoose, { ConnectOptions } from "mongoose";

const connectMongo = async (): Promise<void> => {
  try {
    const MONGO_URI = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.k6fgqcn.mongodb.net/lensed?retryWrites=true&w=majority`;
    mongoose.set("strictQuery", true);
    const { connection } = await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as ConnectOptions);

    if (connection.readyState == 1) {
      console.log("Database connection established");
    }
  } catch (errors) {
    return console.error(errors);
  }
};
export default connectMongo;
