import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import { validationResult } from 'express-validator';

import { registerValidator } from './validations/auth.js';
import UserSchema from './models/User.js';

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

app.post('/auth/login', async (req, res) => {
  try {
    const user = await UserSchema.findOne({ email: req.body.email });

    if (!user) {
      return res.status(404).json({
        message: 'Пользователь не найден', // Неверный логин или пароль
      });
    }

    const isValidPass = await bcrypt.compare(req.body.password, user._doc.passwordHash);

    if (!isValidPass) {
      return res.status(400).json({
        message: 'Неверный логин или пароль',
      });
    }

    const token = jwt.sign({
      _id: user._id,
    }, 'secret123', { expiresIn: '30d' });

    const { passwordHash, ...userData } = user._doc;

    res.json({ ...userData, token });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: 'Не удалось авторизоваться',
    });
  }
});

app.post('/auth/register', registerValidator, async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array());
    }

    const { password } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const doc = new UserSchema({
      fullName: req.body.fullName,
      email: req.body.email,
      passwordHash: hash,
      dateOfBirth: req.body.dateOfBirth,
      gender: req.body.gender,
      avatarUrl: req.body.avatarUrl,
    });

    const user = await doc.save();

    const token = jwt.sign({
      _id: user._id,
    }, 'secret123', { expiresIn: '30d' });

    const { passwordHash, ...userData } = user._doc;

    res.json({ ...userData, token });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: 'Не удалось зарегистрироваться',
    });
  }
});

app.listen(3000, () => console.log('Server OK'));
