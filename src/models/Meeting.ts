import { Schema, model, Types } from 'mongoose';

const MeetingSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  start: {
    type: Date,
    required: true,
  },
  end: {
    type: Date,
    required: true,
  },
  creator: {
    type: Types.ObjectId,
    require: true,
    ref: 'User',
  },
});

export default model('Meeting', MeetingSchema);
