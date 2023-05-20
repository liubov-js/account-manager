import {validationResult} from "express-validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import UserModel from "../models/User.js";

export const register = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array());
    }

    const { password } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const doc = new UserModel({
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
}

export const login = async (req, res) => {
  try {
    const user = await UserModel.findOne({ email: req.body.email });

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
};

export const getMe = async (req, res) => {
  try {
    const user = await UserModel.findOne(req.userId);

    if (!user) {
      return res.status(404).json({
        message: 'Пользователь не найден',
      });
    }

    const { passwordHash, ...userData } = user._doc;

    res.json(userData);
  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: 'Нет доступа',
    });
  }
};

export const update = async (req, res) => {
  try {
    const user = await UserModel.findOne(req.userId);

    await UserModel.updateOne({
      _id: user,
    }, {
      fullName: req.body.fullName,
      password: req.body.password,
      avatarUrl: req.body.avatarUrl,
    });

    res.json({ success: true });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: 'Не удалось обновить аккаунт',
    });
  }
};
