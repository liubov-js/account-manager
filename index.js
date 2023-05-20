import express from 'express';
import mongoose from 'mongoose';
import multer from 'multer';

import { registerValidator, loginValidator, updateValidator } from './validations.js';

import checkAuth from './middleware/checkAuth.js';
import handleValidationErrors from './middleware/handleValidationErrors.js';
import * as UserController from './controllers/UserController.js';
import * as PersonController from './controllers/PersonController.js';

mongoose
  .connect(
    'mongodb+srv://admin:Passw0rd@cluster0.97atwbz.mongodb.net/account-manager?retryWrites=true&w=majority',
  )
  .then(() => {
    console.log('DB ok');
  })
  .catch((err) => console.log('DB error: ', err));

const app = express();

const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    cb(null, 'uploads');
  },
  filename: (_, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

app.use(express.json());
app.use('/uploads', express.static('uploads'));

app.post('/auth/login', loginValidator, handleValidationErrors, UserController.login);
app.post('/auth/register', registerValidator, handleValidationErrors, UserController.register);

app.post('/upload', checkAuth, upload.single('image'), (req, res) => {
  res.json({
    url: `/uploads/${req.file.originalname}`,
  });
});

app.get('/account', checkAuth, UserController.getMe);
app.patch('/account', checkAuth, updateValidator, handleValidationErrors, UserController.update);

app.get('/people', checkAuth, PersonController.getAll);
app.get('/people/:id', checkAuth, PersonController.getOne);

app.listen(3000, () => console.log('Server OK'));
