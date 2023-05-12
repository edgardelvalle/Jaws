import { Schema, model } from 'mongoose';

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  feet: {
    type: Number,
    required: true,
  },
  weight: {
    type: Number,
    required: true,
  },
  inches: {
    type: Number,
    required: true,
  },
  date_of_birth: {
    type: Date,
    required: true,
  },
  intensity: {
    type: String,
    required: true,
  },
  difficulty: {
    type: String,
  },
  max_workout_days: {
    type: Number,
    required: true,
    default: 5,
  },
  available_equipment: [
    {
      type: String,
    },
  ],
  muscle_preference: [
    {
      type: String,
    },
  ],
  following: [
    {
      _id: false,
      userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    },
  ],
  followers: [
    {
      _id: false,
      userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    },
  ],
  workout_routine: [
    {
      _id: false,
      day: {
        type: Number,
        required: true,
      },
      sets: {
        type: Number,
        required: true,
      },
      reps: {
        type: Number,
        required: true,
      },
      completed: {
        type: Boolean,
        required: true,
        default: false,
      },
      workoutId: {
        type: Schema.Types.ObjectId,
        ref: 'Workout',
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      instructions: {
        type: String,
        required: true,
      },
    },
  ],
});

userSchema.methods.getDifficulty = function () {
  const totalHeight = this.feet * 12 + this.inches;
  let bmi = this.weight / totalHeight;

  if (bmi > 25) {
    this.difficulty = 'BEGINNER';
  } else if (bmi >= 18 && bmi <= 25) {
    this.difficulty = 'AMATEUR';
  } else {
    this.difficulty = 'EXPERT';
  }

  return this.save();
};

userSchema.methods.addWorkouts = function (workout) {
  const workoutIndex = this.workout_routine.findIndex((wo) => {
    return wo.workoutId.toString() === workout._id.toString();
  });

  const updatedWorkouts = [...this.workout_routine];

  if (workoutIndex > 0) {
    return;
  }

  let sets = 5;
  let reps = 5;

  switch (this.difficulty) {
    case 'BEGINNER':
      sets = 3;
      reps = 3;
      break;
    case 'AMATEUR':
      sets = 5;
      reps = 5;
      break;
    case 'EXPERT':
      sets = 7;
      reps = 7;
      break;
    default:
      break;
  }

  let newWorkout = {
    day: 1,
    workoutId: workout._id.toString(),
    name: workout.name,
    instructions: workout.instructions,
    sets: sets,
    reps: reps,
  };

  updatedWorkouts.push(newWorkout);

  this.workout_routine = updatedWorkouts;

  return this.save();
};

userSchema.methods.markWorkoutAsComplete = function (workoutId) {
  const completedWorkoutIndex = this.workout_routine.findIndex((wo) => {
    return wo.workoutId.toString() === workoutId;
  });

  const updatedWorkouts = this.workout_routine;
  updatedWorkouts[completedWorkoutIndex].completed = true;

  this.workout_routine = updatedWorkouts;
  return this.save();
};

userSchema.methods.removeWorkout = function (workoutId) {
  console.log(workoutId);
  const updatedWorkouts = this.workout_routine.filter((workout) => {
    return workout.workoutId.toString() !== workoutId;
  });
  this.workout_routine = updatedWorkouts;
  return this.save();
};

userSchema.methods.followUser = function (userId) {
  this.following.push({ userId: userId });
  return this.save();
};

userSchema.methods.unfollowUser = function (userId) {
  const updatedFollowing = this.following.filter((user) => {
    return user.userId.toString() !== userId.toString();
  });
  this.following = updatedFollowing;
  return this.save();
};

export default model('User', userSchema);
