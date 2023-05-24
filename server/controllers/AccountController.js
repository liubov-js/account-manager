import AccountModel from '../models/Account.js';

export const getAll = async (req, res) => {
  try {
    const accounts = await AccountModel.find();

    res.json(accounts.filter((account) => account._id.toString() !== res.accountId));
  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: 'Can not get accounts',
    });
  }
};
