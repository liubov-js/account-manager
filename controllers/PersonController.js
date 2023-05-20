import UserModel from '../models/User.js';

export const getAll = async (req, res) => {
  try {
    const people = await UserModel.find();

    res.json(people);
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
    const person = await UserModel.findById(personId);

    res.json(person);
  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: 'Не удалось получить аккаунт',
    });
  }
};
