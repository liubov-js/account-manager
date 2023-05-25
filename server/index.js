import express from 'express';
import mongoose from 'mongoose';
import multer from 'multer';
import sharp from 'sharp';

import { registerValidator, loginValidator, updateValidator } from './validations.js';

import { checkAuth, handleValidationErrors } from './middleware/index.js';
import {
  AccountController,
  ProfileController,
  LoginController,
  RegisterController,
} from './controllers/index.js';
import cors from 'cors';
import * as dotenv from 'dotenv';
dotenv.config();

mongoose
  .connect(process.env.MONGO_DB_URL)
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
app.use(cors());
app.use('/uploads', express.static('uploads'));

app.post('/auth/login', loginValidator, handleValidationErrors, LoginController);
app.post('/auth/register', registerValidator, handleValidationErrors, RegisterController);

app.post('/upload', upload.single('image'), async (req, res) => {
  const fileName = req.file.originalname;

  try {
    await sharp(`./uploads/${fileName}`)
      .resize({
        width: 100,
        height: 100,
      })
      .toFile(`./uploads/avatars/${fileName}`);
  } catch (error) {
    console.log(error);
  }

  res.json({
    url: `/uploads/avatars/${fileName}`,
  });
});

app.get('/account', checkAuth, ProfileController.getMe);
app.patch('/account', checkAuth, updateValidator, handleValidationErrors, ProfileController.update);

app.get('/people', checkAuth, AccountController.getAll);

app.listen(process.env.PORT, () => console.log(`Server listening on port ${process.env.PORT}`));
