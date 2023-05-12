import { Router } from 'express';
import User from '../models/user.js';

const userRouter = Router();

userRouter.post('/search', (req, res) => {
  console.log(req.body.searchedUser);
  return res.redirect(`/user/${req.body.searchedUser}`);
});

userRouter.get('/:username', (req, res) => {
  User.findOne({ username: req.params.username }).then((result) => {
    if (!result) {
      return res.redirect('/');
    }
    let searched_user_is_self = false;
    let user_is_followed = false;
    if (result._id.toString() == req.session.user._id.toString()) {
      searched_user_is_self = true;
    }

    let user_index_in_following = req.session.user.following.findIndex(
      (user) => user.userId.toString() === result._id.toString()
    );

    if (user_index_in_following >= 0) {
      user_is_followed = true;
    }

    console.log(result.workout_routine);

    return res.render(`dashboard`, {
      searched_user_is_self,
      user_is_followed,
      id: result._id.toString(),
      authenticatedUser: req.session.user.username,
      username: result.username,
      followers: result.followers,
      following: result.following,
      current_equipment: result.available_equipment,
      muscle_preference: result.muscle_preference,
      workout_routine: result.workout_routine,
      completed: result.completed,
    });
  });
});

userRouter.post('/:username/follow', (req, res) => {
  User.findOne({ username: req.params.username })
    .then((result) => {
      if (!result) {
        return;
      }
      req.session.user.followUser(result._id.toString());
      result.followers.push({ userId: req.session.user._id });
      return result.save();
    })
    .then((err) => {
      res.redirect(`/user/${req.params.username}`);
    });
});

userRouter.post('/:username/unfollow', (req, res) => {
  User.findOne({ username: req.params.username })
    .then((result) => {
      if (!result) {
        return;
      }
      req.session.user.unfollowUser(result._id.toString());
      console.log(result.followers);
      result.followers.filter(
        (user) => req.session.user._id != user.userId.toString()
      );
      return result.save();
    })
    .then((err) => {
      res.redirect(`/user/${req.params.username}`);
    });
});

userRouter.post('/:username/completeWorkout', (req, res) => {
  const { workoutId } = req.body;

  User.find({ username: req.session.user._id })
    .then((result) => {
      if (!result) {
        return;
      }
      req.session.user.markWorkoutAsComplete(workoutId);
    })
    .then((err) => {
      return res.redirect(`/user/${req.params.username}`);
    });
});

userRouter.post('/:username/removeWorkout', (req, res) => {
  const { workoutId } = req.body;

  User.find({ username: req.session.user._id })
    .then((result) => {
      if (!result) {
        return;
      }
      req.session.user.removeWorkout(workoutId);
    })
    .then((err) => {
      return res.redirect(`/user/${req.params.username}`);
    });
});

export default userRouter;
