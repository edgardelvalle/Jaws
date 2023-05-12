import { Router } from 'express';
import User from '../models/user.js';
import bcrypt from 'bcrypt';

const loginRouter = Router();

loginRouter.get('/', (req, res) => {
  res.render('login');
});

loginRouter.post('/', async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username: username.toLowerCase() });
  if (!user) {
    console.log('User not found');
    return res.redirect('/login');
  }
  const doMatch = await bcrypt.compare(password, user.password);

  if (doMatch) {
    console.log('Logged in');
    req.session.isLoggedIn = true;
    req.session.user = user;
    req.session.save((err) => {
      console.log(err);
      res.redirect('/user/' + username);
    });
  }
});

export default loginRouter;
