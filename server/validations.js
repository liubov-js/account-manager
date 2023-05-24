import { body } from 'express-validator';

export const loginValidator = [
  body('email', 'Bad format').isEmail(),
  body('password', 'Password must be at least 5 characters long').isLength({ min: 5 }),
];

export const registerValidator = [
  body('fullName', 'Enter your full name').isLength({ min: 3 }),
  body('email', 'Bad format').isEmail(),
  body('password', 'Password must be at least 5 characters long').isLength({ min: 5 }),
  body('dateOfBirth', 'Choose your date of birth').isDate(),
  body('gender', 'Choose your gender').isIn(['male', 'female']),
  body('avatarUrl', 'Invalid URL').optional(),
];

export const updateValidator = [
  body('fullName', 'Enter your full name').isLength({ min: 3 }),
  body('password', 'Password must be at least 5 characters long').isLength({ min: 5 }),
  body('avatarUrl', 'Invalid URL').optional(),
];
