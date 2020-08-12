import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const mongoURI: string = process.env.mongoURI!;

const connectDB: () => Promise<void> = async () => {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log("mongoURI", mongoURI);

    console.log("mongoDB connected...!");
  } catch (error) {
    console.log(error.message);

    //exit process with failure
    process.exit(1);
  }
};

export default connectDB;
