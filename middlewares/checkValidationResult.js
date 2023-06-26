const {validationResult} = require('express-validator');

let checkValidationResult = (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
       return next()
    }
    req.session.formData = req.body
    req.session.formErrors = errors.mapped()
    res.redirect('back');
}

module.exports = checkValidationResult