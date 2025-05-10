const { body } = require('express-validator');

exports.registerValidation = [
  body('username').notEmpty().isLength({ min: 3 }),
  body('password').notEmpty().isLength({ min: 6 })
];

exports.loginValidation = [
  body('username').notEmpty(),
  body('password').notEmpty()
];
