const { resolve } = require("path");
const Admin = require("../models/Admin");
const bcrypt = require('bcrypt');
const { existsSync, mkdirSync, } = require('fs');

let fetchAdmin = async (req, res) => {
    let admins = await Admin.find();
    res.render("admins", { admins });
}

let storeAdmin = async (req, res) => {
    let admin = new Admin(req.body)
    console.log(admin.password);
    admin.password = await bcrypt.hash(admin.password, 10)
    if (await admin.save()) {
        req.flash('Success', 'Admin added successfully')
    } else
        req.flash('Error', 'Unable to create admin')
    res.redirect('/admin/admins');
}

let deleteAdmin = async (req, res) => {
    let { id } = req.params
    let deleted = await Admin.delete(id)
    res.redirect('back')
}



module.exports = { storeAdmin, fetchAdmin, deleteAdmin }; 