const { body } = require('express-validator');
const checkValidationResult = require('../middlewares/checkValidationResult');
const Student = require('../models/Student');

const studentValidator = [
    body('surname').isAlpha().withMessage('Surname can only contain alphabet'),
    body('first_name').isAlpha().withMessage('First name can only contain alphabet'),
    body('other_name').isAlpha().withMessage('Other name can only contain alphabet'),
    body('dob').isBefore().withMessage("Date of birth cannot be a date in the future"),
    body('gender').notEmpty().isIn(['Male', 'Female']),
    body('address').notEmpty().withMessage("Address is required"),
    body('email').notEmpty().isEmail().withMessage("Please enter a valid email"),
    body('phone').notEmpty().isMobilePhone('en-NG').withMessage("Please enter a valid Nigerian mobile number"),
    body('sponsor').notEmpty().withMessage("Please enter your sponsor name"),
    body('sponsor_email').notEmpty().isEmail().withMessage("Please enter your sponsor name"),
    body('sponsor_phone').notEmpty().isMobilePhone('en-NG').withMessage("Please enter a valid Nigerian mobile number"),
    body('sponsor_address').notEmpty().withMessage("Please enter your sponsor address"),
    body('email').custom(async value => {
        const user = await Student.findByEmail(value);
        if (user) {
          throw new Error('E-mail already in use');
        }
      }),
    checkValidationResult,
]

module.exports = studentValidator