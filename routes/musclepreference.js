import { Router } from 'express';
import muscles from '../muscles.js';
import User from '../models/user.js';

const musclePreferenceRouter = Router();

musclePreferenceRouter.get('/', (req, res) => {
  res.render('musclePreference', {
    username: req.session.username,
    muscleGroups: muscles,
  });
});

musclePreferenceRouter.post('/', (req, res) => {
  const { musclepreference } = req.body;
  User.findByIdAndUpdate(
    { _id: req.session.user._id },
    { $set: { muscle_preference: musclepreference } }
  ).then((error) => {
    return res.redirect('/user/' + req.session.user.username);
  });
});

export default musclePreferenceRouter;
