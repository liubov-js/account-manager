import AccountModel from '../models/Account.js';

export const getMe = async (req, res) => {
  try {
    const user = await AccountModel.findOne({ _id: res.userId });

    if (!user) {
      return res.status(404).json({
        message: 'User is not found',
      });
    }

    const { passwordHash, ...userData } = user._doc;

    res.json(userData);
  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: 'No access',
    });
  }
};

export const update = async (req, res) => {
  try {
    const user = await AccountModel.findOne({ _id: res.userId });

    await AccountModel.updateOne({
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
      message: 'Failed to update account',
    });
  }
};
