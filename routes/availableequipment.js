import { Router } from 'express';
import equipment from '../equipment.js';
import User from '../models/user.js';

const availableequipmentRouter = Router();

availableequipmentRouter.get('/', (req, res) => {
  res.render('availableequipment', {
    equipment,
    username: req.session.user.username,
  });
});

availableequipmentRouter.post('/', (req, res) => {
  const { availableequipment } = req.body;
  User.findByIdAndUpdate(
    { _id: req.session.user._id },
    { $set: { available_equipment: availableequipment } }
  ).then((err) => {
    res.redirect('/user/' + req.session.user.username);
  });
});

export default availableequipmentRouter;
