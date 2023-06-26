const { body } = require('express-validator');
const checkValidationResult = require('../middlewares/checkValidationResult');

const courseValidator = [
    body('name').notEmpty().withMessage("Please enter course name"),
    body('duration').isNumeric().withMessage('Duration can only contain Numbers'),
    checkValidationResult,
]

module.exports = courseValidator