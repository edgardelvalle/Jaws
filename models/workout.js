import { Schema, model } from 'mongoose';

const workoutSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  muscle: {
    type: String,
    required: true,
  },
  equipment: {
    type: String,
    required: true,
  },
  reps: {
    type: Number,
    required: true,
  },
  sets: {
    type: Number,
    required: true,
  },
  difficulty: {
    type: String,
    required: true,
  },
  instructions: {
    type: String,
    required: false,
  },
  completed: {
    type: Boolean,
    required: true,
    default: false,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

export default model('Workout', workoutSchema);
