import { Schema, model, Types } from 'mongoose';

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    trim: true,
    unique: true,
  },
  companyName: {
    type: String,
    trim: true,
  },
  password: {
    type: String,
    trim: true,
  },
  meetings: {
    type: Types.ObjectId,
    ref: 'Meeting',
  },
});

export default model('User', userSchema);
