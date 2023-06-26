module.exports = (req, res, next) => {
    req.flash = function (type, message)  {
        req.session.flashMessage = {type, message}
    }
    next()
}