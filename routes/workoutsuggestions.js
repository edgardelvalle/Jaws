import { Router } from 'express';
import Workout from '../models/workout.js';
import { getWorkoutByMuscleAndDifficulty } from '../api/getWorkouts.js';

const workoutsuggestionsRouter = Router();

workoutsuggestionsRouter.get('/', (req, res) => {
  Workout.find({ userId: req.session.user._id }).then((results) => {
    if (!results) {
      return res.redirect('/workoutsuggestions');
    }

    res.render('workoutsuggestions', {
      searched_user_is_self: true,
      authenticatedUser: req.session.user.username,
      workout_routine: req.session.user.workout_routine,
      suggestions: results,
    });
  });
});

workoutsuggestionsRouter.post('/addworkout', (req, res) => {
  const workoutId = req.body.workoutId;
  Workout.findById(workoutId)
    .then((workout) => {
      return req.session.user.addWorkouts(workout);
    })
    .then((result) => {
      res.redirect('/workoutsuggestions');
    });
});

workoutsuggestionsRouter.post('/', async (req, res) => {
  const { id, available_equipment, muscle_preference, intensity } =
    req.session.user;

  const workouts = await Promise.all(
    muscle_preference.map(async (muscle) => {
      let workouts = [];
      for (let i = 0; i < 5; i++) {
        workouts = workouts.concat(
          await getWorkoutByMuscleAndDifficulty(muscle, intensity, i)
        );
      }
      return workouts;
    })
  );
  const flattened_suggestions = workouts.flat();

  let filtered_workouts = [];
  const equipment_set = new Set(available_equipment);

  flattened_suggestions.forEach((suggestion) => {
    if (equipment_set.has(suggestion.equipment)) {
      filtered_workouts.push(suggestion);
    }
  });

  const formattedWorkouts = filtered_workouts.map((workout) => {
    return {
      ...workout,
      sets: 5,
      reps: 0,
      userId: id,
    };
  });

  await Workout.deleteMany({ userId: req.session.user.id });
  await Workout.insertMany(formattedWorkouts);
  res.redirect('/workoutsuggestions');
});

export default workoutsuggestionsRouter;
