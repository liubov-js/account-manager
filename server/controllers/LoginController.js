import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import AccountModel from '../models/Account.js';
import { config } from '../config.js';

export default async (req, res) => {
  try {
    const account = await AccountModel.findOne({ email: req.body.email });

    if (!account) {
      return res.status(404).json({
        message: 'Wrong email or password',
      });
    }

    const isValidPass = await bcrypt.compare(
      req.body.password,
      account._doc.passwordHash,
    );

    if (!isValidPass) {
      return res.status(400).json({
        message: 'Wrong email or password',
      });
    }
   
    const token = jwt.sign(
      {
        _id: account._id,
      },
      config.secret,
      { expiresIn: '30d' },
    );

    const { passwordHash, ...accountData } = account._doc;

    res.json({ ...accountData, token });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: 'Failed to login',
    });
  }
};
