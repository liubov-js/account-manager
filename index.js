import express from 'express';
import mongoose from 'mongoose';

import { registerValidator } from './validations/auth.js';

import checkAuth from './middleware/checkAuth.js';
import * as UserController from './controllers/UserController.js';

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

app.post('/auth/login', UserController.login);
app.post('/auth/register', registerValidator, UserController.register);
app.get('/auth/me', checkAuth, UserController.getMe);

app.listen(3000, () => console.log('Server OK'));
