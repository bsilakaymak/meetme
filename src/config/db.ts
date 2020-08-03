import mongoose from 'mongoose';
// import config from 'config';
// const db: any = config.get('mongoURI');

import dotenv from 'dotenv';

dotenv.config();

const mongoURI = process.env.mongoURI!;

const connectDB = async () => {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });

    console.log('mongoDB connected...!');
  } catch (error) {
    console.log(error.message);

    //exit process with failure
    process.exit(1);
  }
};

export default connectDB;
