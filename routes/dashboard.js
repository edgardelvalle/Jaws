import { Router } from 'express';

const dashboardRoute = Router();

dashboardRoute.get('/', (req, res) => {
  if (!req.session.isLoggedIn) {
    return res.redirect('/login');
  }

  res.render('dashboard', {
    username: req.session.user.username,
    followers: req.session.user.followers,
    following: req.session.user.following,
    current_equipment: req.session.user.available_equipment,
    muscle_preference: req.session.user.muscle_preference,
    workout_routine: req.session.user.workout_routine,
  });
});

export default dashboardRoute;
