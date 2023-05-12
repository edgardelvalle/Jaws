import { Schema, model } from 'mongoose';

const equipmentSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
});

export default model('Equipment', equipmentSchema);
