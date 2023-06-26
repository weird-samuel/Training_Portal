const { body } = require('express-validator');
const checkValidationResult = require('../middlewares/checkValidationResult');

const instructorValidator = [
    body('surname').isAlpha().withMessage('Surname can only contain alphabet'),
    body('first_name').isAlpha().withMessage('First name can only contain alphabet'),
    body('other_name').isAlpha().withMessage('Other name can only contain alphabet'),
    body('dob').isBefore().withMessage("Date of birth cannot be a date in the future"),
    body('gender').notEmpty().isIn(['Male', 'Female', 'female', 'male']),
    body('address').notEmpty().withMessage("Address is required"),
    body('email').notEmpty().isEmail().withMessage("Please enter a valid email"),
    body('phone').notEmpty().isMobilePhone('en-NG').withMessage("Please enter a valid Nigerian mobile number"),
    checkValidationResult,
]

module.exports = instructorValidator