import express from 'express';
import mongoose from 'mongoose';

import { registerValidator, loginValidator } from './validations.js';

import checkAuth from './middleware/checkAuth.js';
import * as UserController from './controllers/UserController.js';
import * as PersonController from './controllers/PersonController.js';

mongoose
  .connect(
    'mongodb+srv://admin:Passw0rd@cluster0.97atwbz.mongodb.net/account-manager?retryWrites=true&w=majority'
  )
  .then(() => {
    console.log('DB ok');
  })
  .catch((err) => console.log('DB error: ', err));

const app = express();

app.use(express.json());

app.post('/auth/login', loginValidator, UserController.login);
app.post('/auth/register', registerValidator, UserController.register);

app.get('/account', checkAuth, UserController.getMe);
app.patch('/account', checkAuth, UserController.update);

app.get('/people', checkAuth, PersonController.getAll);
app.get('/people/:id', checkAuth, PersonController.getOne);

app.listen(3000, () => console.log('Server OK'));
