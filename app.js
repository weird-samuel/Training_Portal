const express = require('express');
const session = require('express-session');
const route = require('./routes/route');
const adminRoute = require('./routes/adminRoute');
const fileUpload = require('express-fileupload');
const verifyAdmin = require('./middlewares/verifyAdmin');
const flash = require('./middlewares/flash');
const connection = require('./models/connection');

const port = 3000
const app = express()

const MySQLStore = require('express-mysql-session')(session);

const sessionStore = new MySQLStore({}, connection);

app.use(session({
	key: 'session_cookie_name',
	secret: 'session_cookie_secret',
	store: sessionStore,
	resave: false,
	saveUninitialized: false
}));

app.use(flash)

app.set('views', 'views')
app.set('view engine', 'ejs')

app.use(express.static('assets'))
app.use(express.static('uploads'))
app.use(express.urlencoded({ extended: true }))
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/'
}))

app.use((req, res, next) => {
    res.locals.admin_id = req.session.admin_id
    res.locals.formData = req.session.formData
    delete req.session.formData
    res.locals.formErrors = req.session.formErrors
    delete req.session.formErrors
    res.locals.flash = req.session.flashMessage
    delete req.session.flashMessage
    next()
})

app.use(route);
app.use('/admin',  adminRoute);
// app.use('/admin', adminRoute);

app.listen(3000, () => console.log(`Server is listening on port ${port}\nvisit http://localhost:${port}`))