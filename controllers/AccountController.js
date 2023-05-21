import AccountModel from '../models/Account.js';

export const getAll = async (req, res) => {
  try {
    const people = await AccountModel.find();

    res.json(people.filter((person) => person._id.toString() !== res.userId));
  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: 'Не удалось получить аккаунты',
    });
  }
};

export const getOne = async (req, res) => {
  try {
    const personId = req.params.id;
    const person = await AccountModel.findById(personId);

    res.json(person);
  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: 'Не удалось получить аккаунт',
    });
  }
};
