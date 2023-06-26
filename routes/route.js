const { Router } = require('express');
const { resolve } = require('path');
const { storeStudent, fetchStudent, updateStudent, deleteStudent } = require('../controllers/StudentController');
const Admin = require('../models/Admin');
const bcrypt = require('bcrypt');

const route = Router();

route.get('/', (req, res) => res.render('index'))
route.get('/student/delete/:id', deleteStudent)
route.get('/student/update/:id', updateStudent)
route.get('/students', fetchStudent)
route.get('/add-student', storeStudent)

route.post('/admin-login', async (req, res) => {
    let { email, password } = req.body
    let admin = await Admin.findByEmail(email)
    if (await bcrypt.compare(password, admin?.password)) {
        req.session.admin_id = admin.id
        req.flash('success', 'Login successful')
    } else {
        req.flash('Error', 'Invalid username or password')
    }
    res.redirect('/');
})

module.exports = route