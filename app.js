import express from 'express';
import session from 'express-session';
import isAuth from './middleware/is-auth.js';
import loginRouter from './routes/login.js';
import availableequipmentRouter from './routes/availableequipment.js';
import workoutsuggestionsRouter from './routes/workoutsuggestions.js';
import signupRouter from './routes/signup.js';
import musclePreferenceRouter from './routes/musclepreference.js';
import mongoose from 'mongoose';
import User from './models/user.js';
import * as dotenv from 'dotenv';
dotenv.config();

import MDBStore from 'connect-mongodb-session';
import userRouter from './routes/users.js';

const MongoDBStore = MDBStore(session);

const app = express();
const store = new MongoDBStore({
  uri: process.env.MONGODB_URI,
  collection: 'sessions',
});

app.set('view engine', 'ejs');

// For parsing application/json
app.use(express.json());

// For parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(
  session({
    secret: 'mysecret',
    resave: false,
    saveUninitialized: false,
    store: store,
  })
);

app.use((req, res, next) => {
  if (!req.session.user) {
    return next();
  }
  User.findById(req.session.user._id)
    .then((user) => {
      req.session.user = user;
      next();
    })
    .catch((err) => console.log(err));
});

app.get('/', (req, res) => {
  if (req.session.isLoggedIn) {
    return res.redirect('/user/' + req.session.user.username);
  }
  res.render('login');
});

app.use((req, res, next) => {
  res.locals.isAuthenticated = req.session.isLoggedIn;
  next();
});

app.use('/login', loginRouter);
app.use('/signup', signupRouter);
app.use('/availableequipment', isAuth, availableequipmentRouter);
app.use('/musclePreference', isAuth, musclePreferenceRouter);
app.use('/workoutsuggestions', isAuth, workoutsuggestionsRouter);
app.use('/user', isAuth, userRouter);
app.post('/logout', isAuth, (req, res) => {
  req.session.destroy((err) => {
    console.log(err);
    res.redirect('/');
  });
});

app.get('/generateSuggestion', isAuth, (req, res) => {
  req.session.user.generateWorkoutSuggestion();
});

mongoose
  .connect(process.env.MONGODB_URI)
  .then((result) => {
    app.listen(3000);
    console.log('Listening on port 3000');
  })
  .catch((err) => {
    console.log(err);
  });
