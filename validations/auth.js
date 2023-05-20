import { body } from "express-validator";

export const registerValidator = [
  body('fullName', 'Укажите имя').isLength({ min: 3 }),
  body('email', 'Неверный формат').isEmail(),
  body('password', 'Пароль должен быть минимум 5 символов').isLength({ min: 5 }),
  body('dateOfBirth').isDate(),
  body('gender').isIn(['male', 'female']),
  body('avatarUrl', 'Неверная ссылка').optional().isURL(),
];
