const { body } = require('express-validator');
const checkValidationResult = require('../middlewares/checkValidationResult');

const planValidator = [
    body('name').notEmpty().withMessage("Please enter course name"),
    body('description').notEmpty().withMessage("Please enter a description"),
    checkValidationResult,
]

module.exports = planValidator;