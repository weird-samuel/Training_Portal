let verifyAdmin = (req, res, next) => {
    if (!req.session.admin_id) {
        return res.redirect('/access-denied.html');
    }
    next()
}

module.exports = verifyAdmin