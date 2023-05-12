import { Router } from 'express';
import User from '../models/user.js';
import bcrypt from 'bcrypt';

const signupRouter = Router();

signupRouter.get('/', (req, res) => {
  res.render('signup');
});

signupRouter.post('/', (req, res) => {
  // console.log(req.body);
  const { username, password, name, weight, feet, inches, dob, intensity } =
    req.body;
  const confirm_password = req.body['password-confirmation'];
  User.findOne({ username: username.toLowerCase() }).then((userDoc) => {
    if (userDoc) {
      return res.redirect('/signup');
    }

    return bcrypt
      .hash(password, 12)
      .then((hashedPassword) => {
        const user = new User({
          username: username.toLowerCase(),
          password: hashedPassword,
          name: name,
          feet: feet,
          inches: inches,
          weight: weight,
          date_of_birth: dob,
          intensity: intensity,
          max_workout_days: 0,
          available_equipment: [],
          muscle_preference: [],
        });
        return user.getDifficulty();
      })
      .then((result) => {
        res.redirect('/login');
      });
  });
});

export default signupRouter;
