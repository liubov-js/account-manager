import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import AccountModel from '../models/Account.js';
import { config } from '../config.js';

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

    const account = await doc.save();

    const token = jwt.sign({
      _id: account._id,
    }, config.secret, { expiresIn: '30d' });

    const { passwordHash, ...accountData } = account._doc;

    res.json({ ...accountData, token });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: 'Failed to register',
    });
  }
};
