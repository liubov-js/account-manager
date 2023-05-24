import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import AccountModel from '../models/Account.js';

export default async (req, res) => {
  try {
    const { password } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const doc = new AccountModel({
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
};
