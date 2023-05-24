import AccountModel from '../models/Account.js';

export const getMe = async (req, res) => {
  try {
    const account = await AccountModel.findOne({ _id: res.accountId });

    if (!account) {
      return res.status(404).json({
        message: 'Account not found',
      });
    }

    const { passwordHash, ...accountData } = account._doc;

    res.json(accountData);
  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: 'No access',
    });
  }
};

export const update = async (req, res) => {
  try {
    await AccountModel.updateOne({
      _id: res.accountId,
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
